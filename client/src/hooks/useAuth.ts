import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { isUnauthorizedError, isValidToken, clearAuthState } from "@/lib/authUtils";

export function useAuth() {
  // Check token validity and manage state properly
  const [hasValidToken, setHasValidToken] = useState(() => {
    const token = localStorage.getItem('auth_token');
    const isValid = isValidToken(token);
    
    // If token exists but is invalid, clear it immediately
    if (token && !isValid) {
      clearAuthState();
      return false;
    }
    
    return isValid;
  });

  // Make auth reactive to token changes by listening for storage events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        const newToken = e.newValue;
        const isValid = isValidToken(newToken);
        setHasValidToken(isValid);
        
        if (newToken && !isValid) {
          clearAuthState();
        }
      }
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Also check for token changes within the same tab by periodically checking
    const checkTokenValidity = () => {
      const token = localStorage.getItem('auth_token');
      const isValid = isValidToken(token);
      
      // Get current state to avoid stale closure
      setHasValidToken(currentValue => {
        if (currentValue !== isValid) {
          if (token && !isValid) {
            clearAuthState();
          }
          return isValid;
        }
        return currentValue;
      });
    };

    // Check token validity every 30 seconds to catch changes within same tab
    const interval = setInterval(checkTokenValidity, 30000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []); // Empty dependency array - only run once on mount
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: hasValidToken, // Only run query if token is valid AND not expired
    retry: false, // Completely disable retries to prevent any loops
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchInterval: false, // No automatic refetching
    refetchOnMount: false, // Don't refetch on component mount if we have cached data
  });

  // Handle auth errors by clearing state immediately
  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      clearAuthState();
      setHasValidToken(false);
      // Don't reload the page - just clear state and let app handle it
    }
  }, [error]);

  // Check if token is close to expiry for valid tokens
  useEffect(() => {
    if (hasValidToken && user) {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      
      // Use isValidToken function which now has robust base64url decoding
      if (!isValidToken(token)) {
        clearAuthState();
        setHasValidToken(false);
        return;
      }
      
      try {
        // We can safely use the base64url decoder from authUtils if needed for expiry check
        // But for now, if isValidToken passed, we know the token is valid
        // We could extract expiry info if needed for warnings
        // JWT token is valid and not expired
      } catch (error) {
        // Should not happen since isValidToken passed, but handle gracefully
        clearAuthState();
        setHasValidToken(false);
      }
    }
  }, [hasValidToken, user]);

  // Authentication state management

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
