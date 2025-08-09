import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, User, MapPin, Phone, Star, CheckCircle2, Repeat, Bell, Smartphone, ArrowLeft, Shield } from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

export default function Scheduling() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(60); // minutes
  const [selectedCaregiver, setSelectedCaregiver] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [clientNotes, setClientNotes] = useState("");
  
  // Recurring appointment settings
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("weekly");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [endDate, setEndDate] = useState("");
  const [maxOccurrences, setMaxOccurrences] = useState("");
  
  // Reminder settings
  const [enableReminders, setEnableReminders] = useState(true);
  const [emailReminder, setEmailReminder] = useState(true);
  const [smsReminder, setSmsReminder] = useState(false);
  const [reminderTiming, setReminderTiming] = useState("60"); // minutes before

  // Get available caregivers for selected date/duration
  const { data: availableCaregivers = [], isLoading: loadingCaregivers } = useQuery({
    queryKey: ["/api/scheduling/available-caregivers", selectedDate.toISOString(), selectedDuration],
    enabled: !!selectedDate && !!selectedDuration,
  }) as { data: any[], isLoading: boolean };

  // Get available time slots for selected caregiver
  const { data: timeSlots = [], isLoading: loadingTimeSlots } = useQuery({
    queryKey: ["/api/scheduling/time-slots", selectedCaregiver?.id, selectedDate.toISOString(), selectedDuration],
    enabled: !!selectedCaregiver && !!selectedDate && !!selectedDuration,
  }) as { data: any[], isLoading: boolean };

  // Book appointment mutation
  const bookAppointmentMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      if (isRecurring) {
        return await apiRequest("POST", "/api/scheduling/book-recurring-appointment", bookingData);
      } else {
        return await apiRequest("POST", "/api/scheduling/book-appointment-with-reminders", bookingData);
      }
    },
    onSuccess: () => {
      const message = isRecurring 
        ? "Your recurring appointments have been successfully scheduled!" 
        : "Your appointment has been successfully scheduled!";
      
      toast({
        title: "Appointment Booked!",
        description: `${message} ${enableReminders ? "You'll receive reminder notifications." : ""}`,
      });
      setBookingDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["/api/scheduling/available-caregivers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Unable to book appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setSelectedCaregiver(null);
    setSelectedTimeSlot("");
    setClientNotes("");
    setIsRecurring(false);
    setRecurrencePattern("weekly");
    setSelectedDays([]);
    setEndDate("");
    setMaxOccurrences("");
    setEnableReminders(true);
    setEmailReminder(true);
    setSmsReminder(false);
    setReminderTiming("60");
  };

  const handleBookAppointment = () => {
    if (!selectedCaregiver || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a caregiver and time slot.",
        variant: "destructive",
      });
      return;
    }

    if (isRecurring && selectedDays.length === 0 && recurrencePattern === "weekly") {
      toast({
        title: "Missing Information",
        description: "Please select at least one day for recurring appointments.",
        variant: "destructive",
      });
      return;
    }

    const [startTime] = selectedTimeSlot.split(" - ");
    const [hours, minutes] = startTime.split(":").map(Number);
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(hours, minutes, 0, 0);

    let bookingData: any = {
      caregiverId: selectedCaregiver.id,
      serviceId: null,
      scheduledDate: scheduledDateTime.toISOString(),
      duration: selectedDuration,
      clientNotes,
    };

    // Add recurring appointment data
    if (isRecurring) {
      bookingData.recurrencePattern = recurrencePattern;
      bookingData.daysOfWeek = selectedDays;
      bookingData.startTime = startTime;
      if (endDate) bookingData.endDate = endDate;
      if (maxOccurrences) bookingData.maxOccurrences = parseInt(maxOccurrences);
    }

    // Add reminder settings
    if (enableReminders) {
      bookingData.reminders = [];
      if (emailReminder) {
        bookingData.reminders.push({
          type: "email",
          minutesBefore: parseInt(reminderTiming),
        });
      }
      if (smsReminder) {
        bookingData.reminders.push({
          type: "sms", 
          minutesBefore: parseInt(reminderTiming),
        });
      }
    }

    bookAppointmentMutation.mutate(bookingData);
  };

  // Generate week calendar
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" asChild>
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Button>

          <Button variant="outline" asChild>
            <a href="/cancellation-policies" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Cancellation Policies
            </a>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Schedule Care Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book appointments with our qualified caregivers. Select your preferred date, time, and caregiver to get started with professional home care services.
          </p>
        </div>

        {/* Service Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Your Appointment
            </CardTitle>
            <CardDescription>
              Choose your preferred date, duration, and browse available caregivers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date and Duration Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  min={format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Service Duration</Label>
                <Select value={selectedDuration.toString()} onValueChange={(value) => setSelectedDuration(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Week Calendar View */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select a Date</h3>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => {
                  const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                  const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                  const isPast = day < new Date();
                  
                  return (
                    <Button
                      key={day.toISOString()}
                      variant={isSelected ? "default" : "outline"}
                      className={`p-3 h-auto flex-col ${isToday ? "ring-2 ring-emerald-500" : ""} ${isPast ? "opacity-50" : ""}`}
                      onClick={() => !isPast && setSelectedDate(day)}
                      disabled={isPast}
                    >
                      <div className="text-xs text-gray-500">{format(day, "EEE")}</div>
                      <div className="text-sm font-semibold">{format(day, "d")}</div>
                      {isToday && <div className="text-xs text-emerald-600">Today</div>}
                    </Button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedDate(addDays(selectedDate, -7))}>
                  Previous Week
                </Button>
                <Button variant="outline" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
                  Next Week
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Caregivers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Available Caregivers
            </CardTitle>
            <CardDescription>
              {format(selectedDate, "EEEE, MMMM d, yyyy")} - {selectedDuration} minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCaregivers ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : availableCaregivers.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-gray-500">No caregivers available for the selected date and duration.</p>
                <p className="text-sm text-gray-400 mt-2">Try selecting a different date or duration.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableCaregivers.map((caregiver: any) => (
                  <Card 
                    key={caregiver.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCaregiver?.id === caregiver.id ? "ring-2 ring-emerald-500 bg-emerald-50" : ""
                    }`}
                    onClick={() => setSelectedCaregiver(caregiver)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium text-gray-900">
                            {caregiver.firstName} {caregiver.lastName}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">4.9 (127 reviews)</span>
                          </div>
                          <p className="text-sm text-gray-600">{caregiver.experience} years experience</p>
                          <div className="flex gap-1 flex-wrap">
                            {caregiver.specialties && caregiver.specialties.split(',').slice(0, 2).map((specialty: string) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty.trim()}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm font-medium text-emerald-600">
                            ${caregiver.hourlyRate}/hour
                          </div>
                        </div>
                      </div>
                      {selectedCaregiver?.id === caregiver.id && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <CheckCircle2 className="w-4 h-4" />
                            Selected
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Time Slots */}
        {selectedCaregiver && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Available Time Slots
              </CardTitle>
              <CardDescription>
                Select your preferred time with {selectedCaregiver.firstName} {selectedCaregiver.lastName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingTimeSlots ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : timeSlots.length === 0 ? (
                <div className="text-center p-8">
                  <p className="text-gray-500">No time slots available for this caregiver on the selected date.</p>
                  <p className="text-sm text-gray-400 mt-2">Please select a different caregiver or date.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {timeSlots.map((slot: any) => {
                    const timeRange = `${slot.startTime} - ${slot.endTime}`;
                    const isSelected = selectedTimeSlot === timeRange;
                    
                    return (
                      <Button
                        key={timeRange}
                        variant={isSelected ? "default" : "outline"}
                        className="p-3 h-auto flex-col"
                        onClick={() => setSelectedTimeSlot(timeRange)}
                      >
                        <div className="text-sm font-medium">{slot.startTime}</div>
                        <div className="text-xs text-gray-500">{selectedDuration}min</div>
                      </Button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Book Appointment Button */}
        {selectedCaregiver && selectedTimeSlot && (
          <div className="flex justify-center">
            <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8 py-4 text-lg bg-emerald-600 hover:bg-emerald-700">
                  Book Appointment Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Book Your Appointment</DialogTitle>
                  <DialogDescription>
                    Configure your appointment with advanced scheduling options
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="recurring">Recurring</TabsTrigger>
                    <TabsTrigger value="reminders">Reminders</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{selectedTimeSlot} ({selectedDuration} minutes)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{selectedCaregiver.firstName} {selectedCaregiver.lastName}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Instructions (optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special requests or information for your caregiver..."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="recurring" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="recurring"
                          checked={isRecurring}
                          onCheckedChange={setIsRecurring}
                        />
                        <Label htmlFor="recurring" className="flex items-center gap-2">
                          <Repeat className="w-4 h-4" />
                          Make this a recurring appointment
                        </Label>
                      </div>

                      {isRecurring && (
                        <div className="space-y-4 p-4 border rounded-lg bg-emerald-50">
                          <div className="space-y-2">
                            <Label>Recurrence Pattern</Label>
                            <Select value={recurrencePattern} onValueChange={setRecurrencePattern}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {(recurrencePattern === "weekly" || recurrencePattern === "biweekly") && (
                            <div className="space-y-2">
                              <Label>Select Days</Label>
                              <div className="grid grid-cols-7 gap-2">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                                  <div key={day} className="flex items-center space-x-1">
                                    <Checkbox
                                      id={`day-${index}`}
                                      checked={selectedDays.includes(index.toString())}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedDays([...selectedDays, index.toString()]);
                                        } else {
                                          setSelectedDays(selectedDays.filter(d => d !== index.toString()));
                                        }
                                      }}
                                    />
                                    <Label htmlFor={`day-${index}`} className="text-xs">{day}</Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="endDate">End Date (optional)</Label>
                              <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={format(selectedDate, "yyyy-MM-dd")}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="maxOccurrences">Max Occurrences (optional)</Label>
                              <Input
                                id="maxOccurrences"
                                type="number"
                                placeholder="e.g., 10"
                                value={maxOccurrences}
                                onChange={(e) => setMaxOccurrences(e.target.value)}
                                min="1"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="reminders" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="reminders"
                          checked={enableReminders}
                          onCheckedChange={setEnableReminders}
                        />
                        <Label htmlFor="reminders" className="flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          Enable appointment reminders
                        </Label>
                      </div>

                      {enableReminders && (
                        <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                          <div className="space-y-2">
                            <Label>Reminder Timing</Label>
                            <Select value={reminderTiming} onValueChange={setReminderTiming}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes before</SelectItem>
                                <SelectItem value="30">30 minutes before</SelectItem>
                                <SelectItem value="60">1 hour before</SelectItem>
                                <SelectItem value="120">2 hours before</SelectItem>
                                <SelectItem value="1440">1 day before</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <Label>Notification Methods</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="email"
                                  checked={emailReminder}
                                  onCheckedChange={setEmailReminder}
                                />
                                <Label htmlFor="email" className="flex items-center gap-2">
                                  📧 Email notification
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="sms"
                                  checked={smsReminder}
                                  onCheckedChange={setSmsReminder}
                                />
                                <Label htmlFor="sms" className="flex items-center gap-2">
                                  <Smartphone className="w-4 h-4" />
                                  SMS/Text message
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => {
                    setBookingDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleBookAppointment}
                    disabled={bookAppointmentMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {bookAppointmentMutation.isPending ? "Booking..." : 
                     isRecurring ? "Book Recurring Appointments" : "Confirm Booking"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}