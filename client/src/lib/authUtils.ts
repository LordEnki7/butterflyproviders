// Helper function for robust base64url decoding (JWT standard)
function base64urlDecode(str: string): string {
  // Replace base64url chars with base64 chars and add padding
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding if needed
  const padding = 4 - (base64.length % 4);
  if (padding !== 4) {
    base64 += '='.repeat(padding);
  }
  
  return atob(base64);
}

export function isUnauthorizedError(error: Error): boolean {
  // More specific patterns to avoid clearing tokens on unrelated 403 errors
  return /^401: /.test(error.message) || 
         /^403: .*[Tt]oken expired/.test(error.message) ||
         /^403: .*[Ii]nvalid.*token/.test(error.message) ||
         /^403: .*[Uu]nauthorized/.test(error.message) ||
         /^403: .*[Aa]uthentication/.test(error.message);
}

// Helper function to validate if a JWT token is valid and not expired
export function isValidToken(token: string | null): boolean {
  if (!token) return false;
  
  try {
    // Use robust base64url decoding for JWT payload
    const payload = base64urlDecode(token.split('.')[1]);
    const decoded = JSON.parse(payload);
    
    // Check if token has expiry and is not expired
    if (!decoded.exp) return false;
    
    const expiry = decoded.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    
    // Token is valid if it's not expired
    return expiry > now;
  } catch (error) {
    // Invalid token format or decoding error
    return false;
  }
}

// Helper function to clear auth state when token is invalid
export function clearAuthState(): void {
  localStorage.removeItem('auth_token');
  console.log('Auth state cleared due to invalid/expired token');
}