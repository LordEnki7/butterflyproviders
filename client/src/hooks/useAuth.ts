import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api", "auth", "user"],
    retry: false,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
    refetchInterval: false,
  });

  // Add debugging
  console.log('useAuth:', { user, isLoading, error: error?.message, isAuthenticated: !!user });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
