export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*Unauthorized/.test(error.message) || 
         /^403: .*Token expired/.test(error.message) ||
         /^403: .*Invalid.*token/.test(error.message);
}