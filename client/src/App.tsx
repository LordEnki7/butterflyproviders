import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Scheduling from "@/pages/Scheduling";
import SchedulingDemo from "@/pages/SchedulingDemo";
import CancellationPolicies from "@/pages/CancellationPolicies";
import Billing from "@/pages/Billing";
import CaregiverManagement from "@/pages/CaregiverManagement";
import Admin from "@/pages/Admin";
import SignUp from "@/pages/SignUp";

// No longer need domain redirect with email/password authentication

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Authentication routes available to all */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/signup" component={SignUp} />
      <Route path="/admin" component={Admin} />
      <Route path="/caregivers" component={CaregiverManagement} />
      <Route path="/scheduling-demo" component={SchedulingDemo} />
      <Route path="/cancellation-policies" component={CancellationPolicies} />
      
      {/* Authenticated routes */}
      {isAuthenticated ? (
        <>
          <Route path="/" component={Home} />
          <Route path="/scheduling" component={Scheduling} />
          <Route path="/billing" component={Billing} />
        </>
      ) : (
        <Route path="/" component={Landing} />
      )}
      
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
