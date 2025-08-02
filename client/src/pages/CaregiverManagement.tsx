import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Phone, MapPin, Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import Header from '@/components/Header';

interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialties: string;
  certification: string;
  hourlyRate: string;
  isActive: boolean;
  experience: number;
  bio: string;
  createdAt: string;
}

interface CaregiverAvailability {
  id: string;
  caregiverId: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface CaregiverTimeOff {
  id: string;
  caregiverId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  notes?: string;
}

interface CaregiverSchedule {
  id: string;
  caregiverId: string;
  clientId: string;
  appointmentId: string;
  date: string;
  startTime: string;
  endTime: string;
  serviceType: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  clientName: string;
  notes?: string;
}

export default function CaregiverManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [showCaregiverDialog, setShowCaregiverDialog] = useState(false);
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false);
  const [showTimeOffDialog, setShowTimeOffDialog] = useState(false);
  const [selectedWeekStart, setSelectedWeekStart] = useState(startOfWeek(new Date()));

  // Fetch caregivers
  const { data: caregivers, isLoading: caregiversLoading } = useQuery({
    queryKey: ['/api/admin/caregivers'],
    enabled: !!user,
  });

  // Fetch caregiver availability
  const { data: availability } = useQuery({
    queryKey: ['/api/admin/caregiver-availability'],
    enabled: !!user,
  });

  // Fetch caregiver time off
  const { data: timeOffRequests } = useQuery({
    queryKey: ['/api/admin/caregiver-time-off'],
    enabled: !!user,
  });

  // Fetch weekly schedules
  const { data: weeklySchedules } = useQuery({
    queryKey: ['/api/admin/caregiver-schedules', format(selectedWeekStart, 'yyyy-MM-dd')],
    enabled: !!user,
  });

  const createCaregiverMutation = useMutation({
    mutationFn: async (caregiverData: any) => {
      return await apiRequest('POST', '/api/admin/caregivers', caregiverData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/caregivers'] });
      setShowCaregiverDialog(false);
      toast({
        title: "Caregiver Created",
        description: "New caregiver has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create caregiver. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateCaregiverMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest('PUT', `/api/admin/caregivers/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/caregivers'] });
      setShowCaregiverDialog(false);
      toast({
        title: "Caregiver Updated",
        description: "Caregiver information has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update caregiver. Please try again.",
        variant: "destructive",
      });
    },
  });

  const setAvailabilityMutation = useMutation({
    mutationFn: async (availabilityData: any) => {
      return await apiRequest('POST', '/api/admin/caregiver-availability', availabilityData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/caregiver-availability'] });
      setShowAvailabilityDialog(false);
      toast({
        title: "Availability Set",
        description: "Caregiver availability has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to set availability. Please try again.",
        variant: "destructive",
      });
    },
  });

  const requestTimeOffMutation = useMutation({
    mutationFn: async (timeOffData: any) => {
      return await apiRequest('POST', '/api/admin/caregiver-time-off', timeOffData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/caregiver-time-off'] });
      setShowTimeOffDialog(false);
      toast({
        title: "Time Off Requested",
        description: "Time off request has been submitted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit time off request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDayName = (dayIndex: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };

  const generateWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(selectedWeekStart, i));
    }
    return days;
  };

  const getSchedulesForDay = (date: Date, caregiverId?: string) => {
    if (!weeklySchedules) return [];
    return weeklySchedules.filter((schedule: CaregiverSchedule) => {
      const scheduleDate = parseISO(schedule.date);
      const matchesDay = isSameDay(scheduleDate, date);
      const matchesCaregiver = caregiverId ? schedule.caregiverId === caregiverId : true;
      return matchesDay && matchesCaregiver;
    });
  };

  if (caregiversLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Caregiver Management</h1>
          <p className="text-gray-600">Manage caregiver profiles, schedules, and availability</p>
        </div>

        <Tabs defaultValue="caregivers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="caregivers">Caregivers</TabsTrigger>
            <TabsTrigger value="schedules">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="timeoff">Time Off</TabsTrigger>
          </TabsList>

          {/* Caregivers Tab */}
          <TabsContent value="caregivers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Caregiver Directory</CardTitle>
                    <CardDescription>
                      Manage caregiver profiles and information
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedCaregiver(null);
                      setShowCaregiverDialog(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Caregiver
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Specializations</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {caregivers?.map((caregiver: Caregiver) => (
                        <TableRow key={caregiver.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium">{caregiver.firstName} {caregiver.lastName}</p>
                                <p className="text-sm text-gray-500">{caregiver.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                {caregiver.phone}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <span className="font-medium">{caregiver.experience} years experience</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {caregiver.specialties?.split(',').map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec.trim()}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${caregiver.hourlyRate}/hr
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(caregiver.isActive ? 'active' : 'inactive')}>
                              {caregiver.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedCaregiver(caregiver);
                                  setShowCaregiverDialog(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!caregivers || caregivers.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <p className="text-gray-500">No caregivers found</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weekly Schedule Tab */}
          <TabsContent value="schedules">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>
                      View caregiver schedules for the week of {format(selectedWeekStart, 'MMMM dd, yyyy')}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedWeekStart(addDays(selectedWeekStart, -7))}
                    >
                      Previous Week
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedWeekStart(addDays(selectedWeekStart, 7))}
                    >
                      Next Week
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {generateWeekDays().map((day, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-center p-2 bg-gray-100 rounded">
                        {getDayName(day.getDay())}
                        <br />
                        <span className="text-sm text-gray-600">
                          {format(day, 'MMM dd')}
                        </span>
                      </h3>
                      <div className="space-y-1 min-h-[200px]">
                        {getSchedulesForDay(day).map((schedule: CaregiverSchedule) => (
                          <div
                            key={schedule.id}
                            className="p-2 rounded border border-gray-200 bg-white text-xs"
                          >
                            <div className="font-medium text-emerald-600">
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                            <div className="text-gray-600">
                              {schedule.clientName}
                            </div>
                            <div className="text-gray-500">
                              {schedule.serviceType}
                            </div>
                            <Badge className={`${getStatusColor(schedule.status)} text-xs mt-1`}>
                              {schedule.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Caregiver Availability</CardTitle>
                    <CardDescription>
                      Manage weekly availability schedules
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAvailabilityDialog(true)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Set Availability
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caregivers?.map((caregiver: Caregiver) => (
                    <div key={caregiver.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">
                        {caregiver.firstName} {caregiver.lastName}
                      </h3>
                      <div className="grid grid-cols-7 gap-2">
                        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                          const dayAvailability = availability?.filter((avail: CaregiverAvailability) => 
                            avail.caregiverId === caregiver.id && avail.dayOfWeek === dayIndex
                          );
                          
                          return (
                            <div key={dayIndex} className="text-center p-2 border rounded">
                              <div className="font-medium text-sm">
                                {getDayName(dayIndex).slice(0, 3)}
                              </div>
                              {dayAvailability?.map((avail: CaregiverAvailability) => (
                                <div key={avail.id} className="text-xs mt-1">
                                  {avail.isAvailable ? (
                                    <div className="text-green-600">
                                      {avail.startTime} - {avail.endTime}
                                    </div>
                                  ) : (
                                    <div className="text-red-600">Unavailable</div>
                                  )}
                                </div>
                              ))}
                              {!dayAvailability?.length && (
                                <div className="text-xs text-gray-400 mt-1">Not set</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Time Off Tab */}
          <TabsContent value="timeoff">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Time Off Requests</CardTitle>
                    <CardDescription>
                      Manage caregiver time off and leave requests
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowTimeOffDialog(true)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Request Time Off
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Caregiver</TableHead>
                        <TableHead>Date Range</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeOffRequests?.map((request: CaregiverTimeOff) => {
                        const caregiver = caregivers?.find((c: Caregiver) => c.id === request.caregiverId);
                        return (
                          <TableRow key={request.id}>
                            <TableCell>
                              {caregiver ? `${caregiver.firstName} ${caregiver.lastName}` : 'Unknown'}
                            </TableCell>
                            <TableCell>
                              {format(parseISO(request.startDate), 'MMM dd, yyyy')} - {format(parseISO(request.endDate), 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell>{request.reason}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {request.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {(!timeOffRequests || timeOffRequests.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <p className="text-gray-500">No time off requests found</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}