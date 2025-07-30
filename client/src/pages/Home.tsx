import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, MessageSquare, User, Clock, CheckCircle, Settings } from 'lucide-react';
import { Link } from 'wouter';

interface DashboardData {
  user: any;
  careUpdates: Array<{
    id: string;
    date: string;
    type: string;
    caregiver: string;
    notes: string;
    status: string;
  }>;
  upcomingAppointments: Array<{
    id: string;
    date: string;
    type: string;
    caregiver: string;
  }>;
}

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardData>({
    queryKey: ['/api/client/dashboard'],
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    // Set page title for SEO
    document.title = "Client Portal - Butterfly Providers";
    
    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Secure client portal for Butterfly Providers home care services. View care updates, schedules, and communicate with your care team.');
  }, []);

  if (isLoading || isDashboardLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {(user as any)?.firstName || 'Client'}!
              </h1>
              <p className="text-gray-600">
                Here's an overview of your care services and recent updates.
              </p>
            </div>
            {(user as any)?.role === 'admin' && (
              <Link href="/admin">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Care Level</span>
                  <span className="text-sm font-medium">Personalized Care</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Emergency Contact</span>
                  <a href="tel:602-830-0966" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                    602-830-0966
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Care Updates */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Recent Care Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData?.careUpdates?.length ? (
                  <div className="space-y-4">
                    {dashboardData.careUpdates.map((update) => (
                      <div key={update.id} className="border-l-4 border-emerald-500 pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{update.type}</h4>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-500">
                              {new Date(update.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Caregiver: {update.caregiver}</p>
                        <p className="text-sm text-gray-700">{update.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No recent care updates available.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData?.upcomingAppointments?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboardData.upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-gray-900">{appointment.type}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {new Date(appointment.date).toLocaleDateString()} at {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-700">Caregiver: {appointment.caregiver}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No upcoming appointments scheduled.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-r from-emerald-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  Need Assistance?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Emergency Care</h4>
                    <p className="text-sm text-gray-600 mb-3">24/7 emergency support available</p>
                    <a href="tel:602-830-0966" className="text-emerald-600 font-medium hover:text-emerald-700">
                      Call Now: 602-830-0966
                    </a>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Schedule Changes</h4>
                    <p className="text-sm text-gray-600 mb-3">Need to modify your care schedule?</p>
                    <a href="#contact" className="text-emerald-600 font-medium hover:text-emerald-700">
                      Contact Care Team
                    </a>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Billing Questions</h4>
                    <p className="text-sm text-gray-600 mb-3">Questions about your account or billing?</p>
                    <a href="mailto:info@butterflyproviders.com" className="text-emerald-600 font-medium hover:text-emerald-700">
                      Email Support
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
