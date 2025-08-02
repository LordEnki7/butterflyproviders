import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, DollarSign, Shield, AlertTriangle, CheckCircle2, XCircle, Calendar, Phone } from "lucide-react";
import { format, addHours, differenceInHours } from "date-fns";
import Header from '@/components/Header';
import { useToast } from "@/hooks/use-toast";

export default function CancellationPolicies() {
  const { toast } = useToast();
  const [selectedPolicy, setSelectedPolicy] = useState("standard");
  const [cancellationReason, setCancellationReason] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Demo appointment for cancellation example
  const demoAppointment = {
    id: "appt-demo-001",
    date: new Date("2025-08-05T10:00:00"),
    caregiver: "Sarah Johnson",
    service: "Personal Care",
    duration: 120,
    cost: 150,
    status: "scheduled"
  };

  // Calculate cancellation fees based on policy and timing
  const calculateCancellationFee = (appointmentDate: Date, policyType: string = "standard") => {
    const now = new Date();
    const hoursUntilAppt = differenceInHours(appointmentDate, now);
    
    const policies = {
      standard: [
        { minHours: 24, feePercent: 0, description: "No fee" },
        { minHours: 4, feePercent: 25, description: "25% fee" },
        { minHours: 0, feePercent: 50, description: "50% fee" }
      ],
      premium: [
        { minHours: 48, feePercent: 0, description: "No fee" },
        { minHours: 24, feePercent: 15, description: "15% fee" },
        { minHours: 4, feePercent: 35, description: "35% fee" },
        { minHours: 0, feePercent: 75, description: "75% fee" }
      ],
      emergency: [
        { minHours: 2, feePercent: 0, description: "No fee" },
        { minHours: 0, feePercent: 100, description: "Full fee" }
      ]
    };

    const policy = policies[policyType as keyof typeof policies] || policies.standard;
    
    for (const tier of policy) {
      if (hoursUntilAppt >= tier.minHours) {
        return {
          percent: tier.feePercent,
          amount: (demoAppointment.cost * tier.feePercent) / 100,
          description: tier.description,
          hoursUntil: hoursUntilAppt
        };
      }
    }
    
    return {
      percent: 100,
      amount: demoAppointment.cost,
      description: "Full fee",
      hoursUntil: hoursUntilAppt
    };
  };

  const handleCancelAppointment = async () => {
    const feeInfo = calculateCancellationFee(demoAppointment.date, selectedPolicy);
    
    toast({
      title: "Appointment Cancelled",
      description: `Cancellation fee: $${feeInfo.amount.toFixed(2)} (${feeInfo.percent}%)`,
      variant: feeInfo.percent === 0 ? "default" : "destructive",
    });
    
    setShowCancelDialog(false);
    setCancellationReason("");
  };

  const currentFeeInfo = calculateCancellationFee(demoAppointment.date, selectedPolicy);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <Header />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Cancellation Policies</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear, fair cancellation policies that protect both clients and caregivers while maintaining flexibility.
            </p>
          </div>

          {/* Policy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fair & Transparent</h3>
                <p className="text-gray-600 text-sm">
                  Clear fee structure based on advance notice provided for cancellations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Time-Based Fees</h3>
                <p className="text-gray-600 text-sm">
                  Earlier cancellation means lower fees, encouraging advance notice.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Caregiver Protection</h3>
                <p className="text-gray-600 text-sm">
                  Policies ensure caregivers are compensated for reserved time slots.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Policy Types */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Cancellation Policy Options</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Standard Policy */}
              <Card className={`cursor-pointer transition-all ${selectedPolicy === 'standard' ? 'ring-2 ring-emerald-500 border-emerald-300' : ''}`} 
                    onClick={() => setSelectedPolicy('standard')}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Standard Policy</CardTitle>
                    <Badge variant="secondary">Most Popular</Badge>
                  </div>
                  <CardDescription>Balanced approach for regular appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">24+ hours advance</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">No Fee</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-sm">4-24 hours advance</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">25% Fee</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm">Less than 4 hours</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">50% Fee</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Policy */}
              <Card className={`cursor-pointer transition-all ${selectedPolicy === 'premium' ? 'ring-2 ring-emerald-500 border-emerald-300' : ''}`} 
                    onClick={() => setSelectedPolicy('premium')}>
                <CardHeader>
                  <CardTitle className="text-lg">Premium Policy</CardTitle>
                  <CardDescription>For specialized or high-demand services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">48+ hours advance</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">No Fee</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm">24-48 hours advance</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">15% Fee</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-sm">4-24 hours advance</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">35% Fee</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm">Less than 4 hours</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">75% Fee</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Policy */}
              <Card className={`cursor-pointer transition-all ${selectedPolicy === 'emergency' ? 'ring-2 ring-emerald-500 border-emerald-300' : ''}`} 
                    onClick={() => setSelectedPolicy('emergency')}>
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Policy</CardTitle>
                  <CardDescription>For urgent or critical care situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">2+ hours advance</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">No Fee</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm">Less than 2 hours</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">Full Fee</Badge>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-orange-50 rounded">
                    <p className="text-xs text-orange-700">
                      Emergency policy applies to urgent medical or safety situations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Live Cancellation Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Cancellation Fee Calculator</CardTitle>
              <CardDescription>
                See how cancellation fees are calculated based on timing and policy type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Demo Appointment Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date & Time:</span>
                      <span className="text-sm font-medium">{format(demoAppointment.date, "MMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Caregiver:</span>
                      <span className="text-sm font-medium">{demoAppointment.caregiver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Service:</span>
                      <span className="text-sm font-medium">{demoAppointment.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm font-medium">{demoAppointment.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cost:</span>
                      <span className="text-sm font-medium">${demoAppointment.cost}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Current Cancellation Impact</h3>
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Selected Policy:</span>
                      <Badge variant="outline" className="capitalize">{selectedPolicy}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hours Until Appointment:</span>
                      <span className="text-sm font-medium">{currentFeeInfo.hoursUntil.toFixed(1)} hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cancellation Fee:</span>
                      <span className={`text-sm font-bold ${currentFeeInfo.percent === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${currentFeeInfo.amount.toFixed(2)} ({currentFeeInfo.percent}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Refund Amount:</span>
                      <span className="text-sm font-medium text-green-600">
                        ${(demoAppointment.cost - currentFeeInfo.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancel Appointment Demo */}
              <div className="border-t pt-6">
                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel This Appointment (Demo)
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Cancel Appointment</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for cancellation. A ${currentFeeInfo.amount.toFixed(2)} fee will apply.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cancellation Reason</label>
                        <Select value={cancellationReason} onValueChange={setCancellationReason}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reason..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal-emergency">Personal Emergency</SelectItem>
                            <SelectItem value="illness">Illness</SelectItem>
                            <SelectItem value="schedule-conflict">Schedule Conflict</SelectItem>
                            <SelectItem value="no-longer-needed">Service No Longer Needed</SelectItem>
                            <SelectItem value="caregiver-request">Caregiver Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="bg-red-50 p-3 rounded border border-red-200">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div className="text-sm">
                            <div className="font-medium text-red-900">Cancellation Fee: ${currentFeeInfo.amount.toFixed(2)}</div>
                            <div className="text-red-700">Refund Amount: ${(demoAppointment.cost - currentFeeInfo.amount).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1">
                          Keep Appointment
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleCancelAppointment}
                          disabled={!cancellationReason}
                          className="flex-1"
                        >
                          Confirm Cancellation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Policy Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Policy Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Automatic fee calculation based on timing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Instant refund processing for eligible cancellations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Email notifications to all parties
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Option to reschedule instead of cancel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Emergency exception handling
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Our team is here to help with cancellations, rescheduling, or policy questions.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">602-830-0966</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Available 24/7 for emergency cancellations
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}