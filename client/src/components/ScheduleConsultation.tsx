import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Phone, Mail } from 'lucide-react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ScheduleConsultation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    agreeToContact: false
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const consultationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/consultation", data);
    },
    onSuccess: () => {
      toast({
        title: "Consultation Scheduled",
        description: "We'll contact you soon to confirm your consultation appointment.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
        agreeToContact: false
      });
      queryClient.invalidateQueries({ queryKey: ['/api/consultations'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to schedule consultation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToContact) {
      toast({
        title: "Agreement Required",
        description: "Please agree to receive text and email messages to proceed.",
        variant: "destructive",
      });
      return;
    }

    consultationMutation.mutate(formData);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Schedule Your Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss your care needs and create a personalized plan for you or your loved one.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-emerald-700">
                <Calendar className="h-6 w-6" />
                Free In-Home Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="(602) 555-0123"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <Input
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your care needs
                  </label>
                  <Textarea
                    placeholder="Please describe the type of care needed, any specific requirements, and any questions you have..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="agreeToContact"
                    checked={formData.agreeToContact}
                    onCheckedChange={(checked) => handleInputChange('agreeToContact', checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="agreeToContact" className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium">I agree to receive text messages and emails</span> from Butterfly Providers 
                    regarding my consultation request, appointment reminders, and care updates. 
                    Standard message and data rates may apply. You can opt out at any time.
                  </label>
                </div>

                <Button 
                  type="submit"
                  disabled={consultationMutation.isPending || !formData.agreeToContact}
                  className="w-full bg-emerald-600 text-white py-4 font-semibold hover:bg-emerald-700 h-auto transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
                >
                  {consultationMutation.isPending ? 'Scheduling...' : 'Schedule Free Consultation'}
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Call Us Directly</p>
                      <p className="text-sm">602-830-0966</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm">Mon-Fri 8AM-5PM</p>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}