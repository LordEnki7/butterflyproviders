import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Scheduling from "@/pages/Scheduling";
import Admin from "@/pages/Admin";
import SignUp from "@/pages/SignUp";

function DomainRedirect() {
  if (window.location.hostname === 'localhost') {
    // Redirect to proper Replit domain for authentication to work
    const replitDomain = "9f6e6cf4-e329-4c2c-906b-2f619827d1bd-00-9827no39zpr4.riker.replit.dev";
    window.location.href = `https://${replitDomain}${window.location.pathname}${window.location.search}`;
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to secure domain...</p>
        </div>
      </div>
    );
  }
  return null;
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Check if we need to redirect from localhost
  if (window.location.hostname === 'localhost') {
    return <DomainRedirect />;
  }

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/signup" component={SignUp} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/schedule" component={Scheduling} />
        </>
      )}
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
