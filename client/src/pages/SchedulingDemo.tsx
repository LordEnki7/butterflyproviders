import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Star, CheckCircle2, Smartphone, Bell, Repeat, ArrowLeft, Home } from "lucide-react";
import { format, addDays } from "date-fns";
import { Shield } from "lucide-react";
import Header from '@/components/Header';

export default function SchedulingDemo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(120);
  const [selectedCaregiver, setSelectedCaregiver] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("10:00 - 12:00");
  const [bookingStep, setBookingStep] = useState(1);

  // Demo caregivers data
  const demoCaregiver = {
    id: "caregiver-demo",
    firstName: "Available",
    lastName: "Caregiver",
    experience: 5,
    specialties: "Personal Care, Companionship, Light Housekeeping",
    hourlyRate: "30",
    certification: "CNA Certified"
  };

  // Demo time slots
  const demoTimeSlots = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" }
  ];

  const handleBookingDemo = () => {
    setBookingStep(bookingStep + 1);
    if (bookingStep >= 4) {
      // Reset demo
      setBookingStep(1);
      setSelectedCaregiver(null);
      setSelectedTimeSlot("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <Header />
      <div className="p-4 sm:p-6 lg:p-8">
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
              <a href="/scheduling" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Live Scheduling
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
            <h1 className="text-4xl font-bold text-gray-900">Online Appointment Scheduling System</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our comprehensive scheduling platform with real-time availability, instant booking, 
              appointment reminders, and mobile optimization.
            </p>
          </div>

          {/* Feature Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Availability</h3>
                <p className="text-gray-600 text-sm">
                  Check caregiver availability instantly with live schedule updates and conflict prevention.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Booking</h3>
                <p className="text-gray-600 text-sm">
                  Book appointments immediately with automatic confirmation and caregiver notification.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mobile Optimized</h3>
                <p className="text-gray-600 text-sm">
                  Fully responsive design with mobile-first approach for scheduling on any device.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Booking Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Booking Demo</CardTitle>
              <CardDescription>
                Step {bookingStep} of 4 - Experience the complete appointment booking process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Date Selection */}
              {bookingStep >= 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      1
                    </div>
                    <h3 className="text-lg font-medium">Select Date & Duration</h3>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Selected Date</label>
                        <div className="text-lg">{format(selectedDate, "EEEE, MMMM d, yyyy")}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Duration</label>
                        <div className="text-lg">{selectedDuration} minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Caregiver Selection */}
              {bookingStep >= 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      2
                    </div>
                    <h3 className="text-lg font-medium">Select Caregiver</h3>
                  </div>
                  <Card className="border-emerald-200 bg-emerald-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium text-gray-900">
                            {demoCaregiver.firstName} {demoCaregiver.lastName}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">4.9 (127 reviews)</span>
                          </div>
                          <p className="text-sm text-gray-600">{demoCaregiver.experience} years experience</p>
                          <div className="flex gap-1 flex-wrap">
                            {demoCaregiver.specialties.split(',').slice(0, 2).map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty.trim()}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm font-medium text-emerald-600">
                            ${demoCaregiver.hourlyRate}/hour
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 3: Time Slot Selection */}
              {bookingStep >= 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      3
                    </div>
                    <h3 className="text-lg font-medium">Select Time Slot</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {demoTimeSlots.map((slot, index) => {
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
                </div>
              )}

              {/* Step 4: Booking Confirmation */}
              {bookingStep >= 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      4
                    </div>
                    <h3 className="text-lg font-medium">Booking Confirmed!</h3>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-900">Appointment Successfully Scheduled</h4>
                        <div className="text-sm text-green-700 space-y-1">
                          <div>📅 {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTimeSlot}</div>
                          <div>👤 {demoCaregiver.firstName} {demoCaregiver.lastName}</div>
                          <div>⏱️ {selectedDuration} minutes</div>
                          <div>💰 Estimated cost: ${(parseInt(demoCaregiver.hourlyRate) * (selectedDuration / 60)).toFixed(2)}</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600 mt-3">
                          <Bell className="w-4 h-4" />
                          <span>Email reminder set for 1 hour before appointment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Controls */}
              <div className="flex justify-center pt-4">
                <Button onClick={handleBookingDemo} size="lg" className="px-8">
                  {bookingStep < 4 ? `Continue to Step ${bookingStep + 1}` : "Start Demo Over"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Repeat className="w-5 h-5" />
                  Recurring Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Set up recurring appointments with flexible patterns:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Daily, weekly, bi-weekly, or monthly patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Custom day selection for weekly patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    End date or maximum occurrence limits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Automatic conflict detection and resolution
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Smart Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Automated reminder system keeps everyone informed:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Email and SMS reminder options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Customizable timing (15 min to 24 hours before)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Automatic caregiver notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Appointment change notifications
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* System Benefits */}
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-0">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Why Choose Our Scheduling System?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime Reliability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">&lt;2 sec</div>
                    <div className="text-sm text-gray-600">Booking Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Online Availability</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}