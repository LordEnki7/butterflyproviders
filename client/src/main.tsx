import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force clear any existing auth tokens on app startup to ensure clean state
// This prevents issues with expired tokens causing infinite retry loops
const authToken = localStorage.getItem('auth_token');
if (authToken) {
  try {
    // Check if token is expired
    const decoded = JSON.parse(atob(authToken.split('.')[1]));
    const expiry = decoded.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    
    // If token is expired, clear it immediately
    if (expiry <= now) {
      console.log('Clearing expired auth token on app startup');
      localStorage.removeItem('auth_token');
    }
  } catch (error) {
    // Invalid token format, clear it
    console.log('Clearing invalid auth token on app startup');
    localStorage.removeItem('auth_token');
  }
}

createRoot(document.getElementById("root")!).render(<App />);
