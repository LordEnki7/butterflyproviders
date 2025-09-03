import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { isUnauthorizedError } from "@/lib/authUtils";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: (failureCount, error) => {
      // Don't retry on 401 errors (unauthorized)
      if (isUnauthorizedError(error as Error)) {
        // Clear invalid token
        localStorage.removeItem('auth_token');
        return false;
      }
      return failureCount < 2; // Reduce retry attempts
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
    refetchInterval: false,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  // Check if token is close to expiry and handle refresh
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && user) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const expiry = decoded.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const timeUntilExpiry = expiry - now;
        
        // If token expires in less than 2 hours, show warning
        if (timeUntilExpiry < 2 * 60 * 60 * 1000 && timeUntilExpiry > 0) {
          console.log('JWT token expires soon, consider implementing auto-refresh');
        }
        
        // If token is expired, clear it
        if (timeUntilExpiry <= 0) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
      } catch (error) {
        // Invalid token format, clear it
        localStorage.removeItem('auth_token');
      }
    }
  }, [user]);

  // Add debugging
  console.log('useAuth:', { user, isLoading, error: error?.message, isAuthenticated: !!user });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
