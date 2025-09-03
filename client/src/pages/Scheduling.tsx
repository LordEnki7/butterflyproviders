import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, Phone, ArrowLeft, HeartHandshake, MessageCircle } from "lucide-react";
import { format } from "date-fns";

export default function Scheduling() {
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [urgency, setUrgency] = useState("within-week");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Submit consultation request
  const submitConsultationMutation = useMutation({
    mutationFn: async (requestData: any) => {
      return await apiRequest("POST", "/api/consultation-requests", requestData);
    },
    onSuccess: () => {
      toast({
        title: "Consultation Request Submitted!",
        description: "Our team will call you within 24 hours to schedule your in-home consultation.",
      });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Unable to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPreferredDate("");
    setPreferredTime("");
    setServiceType("");
    setUrgency("within-week");
    setAdditionalInfo("");
  };

  const handleSubmit = () => {
    if (!name || !phone) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    const requestData = {
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      serviceType,
      urgency,
      additionalInfo,
      requestType: "consultation",
      submittedAt: new Date().toISOString(),
    };

    submitConsultationMutation.mutate(requestData);
  };

  // Set page title for SEO
  useEffect(() => {
    document.title = "Schedule Consultation - Butterfly Providers";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Schedule a free in-home consultation with Butterfly Providers. Request a call to discuss your home care needs and get personalized service recommendations.');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" asChild>
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <HeartHandshake className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Schedule Your Free Consultation</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's discuss your home care needs. Fill out this form and our team will call you to schedule an in-home consultation at your convenience.
          </p>
        </div>

        {/* Office Contact Info */}
        <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <Phone className="w-6 h-6" />
              <div>
                <h3 className="text-lg font-semibold">Prefer to Call Directly?</h3>
                <p className="text-emerald-100">Call our office: (555) 123-4567</p>
                <p className="text-sm text-emerald-200">Monday - Friday, 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Request Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Request a Consultation Call
            </CardTitle>
            <CardDescription>
              Tell us about yourself and your care needs. We'll call you to schedule your free in-home consultation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  data-testid="input-name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  data-testid="input-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address (optional)</Label>
              <Input
                id="email"
                data-testid="input-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Service Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-type">Type of Care Needed</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger data-testid="select-service-type">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal-care">Personal Care</SelectItem>
                    <SelectItem value="companionship">Companionship</SelectItem>
                    <SelectItem value="meal-prep">Meal Preparation</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="respite-care">Respite Care</SelectItem>
                    <SelectItem value="dementia-support">Dementia Support</SelectItem>
                    <SelectItem value="multiple-services">Multiple Services</SelectItem>
                    <SelectItem value="not-sure">Not Sure - Need Guidance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">When Do You Need Care?</Label>
                <Select value={urgency} onValueChange={setUrgency}>
                  <SelectTrigger data-testid="select-urgency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately (within 24-48 hours)</SelectItem>
                    <SelectItem value="within-week">Within a week</SelectItem>
                    <SelectItem value="within-month">Within a month</SelectItem>
                    <SelectItem value="planning-ahead">Planning ahead (1+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scheduling Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferred-date">Preferred Consultation Date (optional)</Label>
                <Input
                  id="preferred-date"
                  data-testid="input-preferred-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred-time">Preferred Time to Call</Label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger data-testid="select-preferred-time">
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
                    <SelectItem value="anytime">Anytime during business hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea
                id="additional-info"
                data-testid="textarea-additional-info"
                placeholder="Tell us about your specific care needs, any questions you have, or special considerations for the consultation..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSubmit}
                disabled={submitConsultationMutation.isPending}
                data-testid="button-submit-consultation"
              >
                {submitConsultationMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5 mr-2" />
                    Request Consultation Call
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-emerald-600">1</span>
                </div>
                <h3 className="font-semibold">Submit Request</h3>
                <p className="text-sm text-gray-600">Fill out the form with your contact info and care needs</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-emerald-600">2</span>
                </div>
                <h3 className="font-semibold">We Call You</h3>
                <p className="text-sm text-gray-600">Our care coordinator calls within 24 hours to discuss your needs</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-emerald-600">3</span>
                </div>
                <h3 className="font-semibold">Schedule Visit</h3>
                <p className="text-sm text-gray-600">We schedule a free in-home consultation at your convenience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Questions? We're Here to Help</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span>Monday - Friday, 8:00 AM - 6:00 PM</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Our experienced care coordinators are standing by to answer your questions and help you find the perfect care solution.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}