import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionMenu from '@/components/FloatingActionMenu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, MessageSquare, User, Clock, CheckCircle, Settings, Phone, Mail, AlertTriangle } from 'lucide-react';
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
  stats: {
    totalAppointments: number;
    completedThisMonth: number;
    nextAppointment: string;
    primaryCaregiver: string;
  };
}

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Remove automatic redirect - let router handle authentication
  // The router already handles showing Login vs Home based on auth state

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardData>({
    queryKey: ['/api/client/dashboard'],
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Session expired",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
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
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Logged in as {(user as any)?.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/scheduling">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 font-semibold transition-all duration-200 hover:scale-105">
                  📅 Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
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

            {/* Care Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-600" />
                  Care Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Appointments</span>
                  <span className="text-sm font-medium">{dashboardData?.stats?.totalAppointments || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-medium">{dashboardData?.stats?.completedThisMonth || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Primary Caregiver</span>
                  <span className="text-sm font-medium">{dashboardData?.stats?.primaryCaregiver || 'Assigned Soon'}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-700 font-medium">Next appointment scheduled</span>
                  </div>
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
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No upcoming appointments scheduled.</p>
                    <Link href="/schedule">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule New Appointment
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Need Assistance - Integrated Support Center */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border border-emerald-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                  Need Assistance? We're Here to Help
                </CardTitle>
                <p className="text-gray-600 mt-2">Choose the option that best fits your needs - our care team is ready to support you</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Emergency Care */}
                  <div className="group relative">
                    <div className="bg-white rounded-xl p-6 border border-red-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                          <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">Emergency Care</h3>
                          <p className="text-sm text-gray-600 mb-4">Immediate 24/7 emergency support when you need it most</p>
                        </div>
                        <Button 
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-md"
                          onClick={() => window.open('tel:602-830-0966', '_self')}
                          data-testid="button-emergency-call"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now: 602-830-0966
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Changes */}
                  <div className="group relative">
                    <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                          <Calendar className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">Schedule Changes</h3>
                          <p className="text-sm text-gray-600 mb-4">Need to modify appointments or care schedule arrangements</p>
                        </div>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-md"
                          onClick={() => window.open('tel:602-830-0966', '_self')}
                          data-testid="button-schedule-changes"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Care Team
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Billing Questions */}
                  <div className="group relative">
                    <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                          <FileText className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">Billing Questions</h3>
                          <p className="text-sm text-gray-600 mb-4">Account inquiries, payment questions, and billing support</p>
                        </div>
                        <Button 
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-md"
                          onClick={() => window.open('mailto:info@butterflyproviders.com', '_self')}
                          data-testid="button-billing-support"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM MST
                    </p>
                    <p className="text-sm text-gray-500">
                      For non-urgent matters, you can also visit our{' '}
                      <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                        Contact Page
                      </Link>{' '}
                      to submit a detailed request.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingActionMenu />
    </div>
  );
}
