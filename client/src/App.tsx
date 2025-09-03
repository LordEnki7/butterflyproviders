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
import PersonalCare from "@/pages/PersonalCare";
import Companionship from "@/pages/Companionship";
import MealPrep from "@/pages/MealPrep";
import Transportation from "@/pages/Transportation";
import DementiaSupport from "@/pages/DementiaSupport";
import RespiteCare from "@/pages/RespiteCare";
import AboutUs from "@/pages/AboutUs";
import Services from "@/pages/Services";
import DetailedServices from "@/pages/DetailedServices";
import JoinOurTeam from "@/pages/JoinOurTeam";
import ClientPortalDemo from "@/pages/ClientPortalDemo";

// No longer need domain redirect with email/password authentication

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Add debugging
  console.log('Router - Auth state:', { isAuthenticated, isLoading });

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  return (
    <Switch>
      {/* Authentication routes available to all */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/signup" component={SignUp} />
      <Route path="/admin" component={Admin} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/services" component={Services} />
      <Route path="/services/detailed" component={DetailedServices} />
      <Route path="/join-our-team" component={JoinOurTeam} />
      <Route path="/caregivers" component={CaregiverManagement} />
      <Route path="/scheduling" component={Scheduling} />
      <Route path="/scheduling-demo" component={SchedulingDemo} />
      <Route path="/cancellation-policies" component={CancellationPolicies} />
      <Route path="/services/personal-care" component={PersonalCare} />
      <Route path="/services/companionship" component={Companionship} />
      <Route path="/services/meal-prep" component={MealPrep} />
      <Route path="/services/transportation" component={Transportation} />
      <Route path="/services/dementia-support" component={DementiaSupport} />
      <Route path="/services/respite-care" component={RespiteCare} />
      <Route path="/client-portal-demo" component={ClientPortalDemo} />
      <Route path="/client-portal" component={Home} />
      
      {/* Authenticated routes */}
      {isAuthenticated ? (
        <>
          <Route path="/" component={Home} />
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
