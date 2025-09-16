import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'wouter';

export default function ClientPortalDemo() {
  const user = {
    firstName: "Demo",
    lastName: "User",
    email: "demo@butterflyproviders.com"
  };

  const careUpdates = [
    {
      id: "1",
      date: "2025-08-31T23:02:17.399Z",
      type: "Personal Care Session",
      caregiver: "Sarah Johnson, CNA",
      notes: "Completed morning routine including assistance with bathing and medication reminder. Client was in good spirits and reported feeling well.",
      status: "completed"
    },
    {
      id: "2", 
      date: "2025-08-28T23:02:17.399Z",
      type: "Meal Preparation",
      caregiver: "Maria Garcia, HHA",
      notes: "Prepared healthy breakfast and lunch. Discussed nutrition goals with client. Grocery shopping completed for the week.",
      status: "completed"
    },
    {
      id: "3",
      date: "2025-08-26T23:02:17.399Z", 
      type: "Companionship Visit",
      caregiver: "Robert Chen, Companion",
      notes: "Enjoyed conversation about client's gardening interests. Took a short walk around the neighborhood. Client expressed enjoyment of social interaction.",
      status: "completed"
    }
  ];

  const upcomingAppointments = [
    {
      id: "1",
      date: "2025-09-03T23:02:17.399Z",
      type: "Personal Care & Light Housekeeping", 
      caregiver: "Sarah Johnson, CNA"
    },
    {
      id: "2",
      date: "2025-09-05T23:02:17.399Z",
      type: "Transportation to Medical Appointment",
      caregiver: "Michael Davis, Aide"
    },
    {
      id: "3", 
      date: "2025-09-07T23:02:17.399Z",
      type: "Meal Prep & Grocery Shopping",
      caregiver: "Maria Garcia, HHA"
    }
  ];

  const stats = {
    totalAppointments: 24,
    completedThisMonth: 8,
    nextAppointment: "2025-09-03T23:02:17.399Z",
    primaryCaregiver: "Sarah Johnson, CNA"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-emerald-600">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Your personalized care dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/scheduling">Book Appointment</Link>
              </Button>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-900 font-semibold">Emergency: 602-830-0966</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  <Link href="tel:602-830-0966" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                    Schedule Changes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{stats.totalAppointments}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.completedThisMonth}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Primary Caregiver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{stats.primaryCaregiver}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Care Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                Premium Care
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Care Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-emerald-600" />
                Recent Care Updates
              </CardTitle>
              <CardDescription>
                Latest updates from your care team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {careUpdates.map((update) => (
                <div key={update.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-emerald-700">{update.type}</h4>
                    <Badge variant="outline" className="text-xs">
                      {new Date(update.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{update.notes}</p>
                  <p className="text-xs text-blue-600 font-medium">{update.caregiver}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>
                Your scheduled care visits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-blue-700">{appointment.type}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {appointment.caregiver}
                  </p>
                </div>
              ))}
              
              <Button className="w-full mt-4" asChild>
                <Link href="/scheduling">Schedule New Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your care and account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                <Link href="/scheduling">
                  <CalendarDays className="h-6 w-6" />
                  <span>Book Appointment</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                <Link href="/billing">
                  <Clock className="h-6 w-6" />
                  <span>View Billing</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Main Site */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/">← Back to Main Site</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}