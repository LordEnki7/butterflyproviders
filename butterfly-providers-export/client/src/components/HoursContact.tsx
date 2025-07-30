import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Phone, Mail, Clock } from 'lucide-react';

export default function HoursContact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your inquiry!",
        description: "We'll contact you within 2 hours during business hours.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit your inquiry. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const hoursData = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "On-Call Emergency" },
    { day: "24/7 Care Available", hours: "Upon Request", special: true }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Hours of Operation */}
          <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Hours of Operation</h3>
            <div className="space-y-4">
              {hoursData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                  <span className="font-semibold text-gray-900">{item.day}</span>
                  <span className={item.special ? "text-emerald-600 font-semibold" : "text-gray-700"}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
            
            <Card className="mt-8">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Emergency Contact</h4>
                <p className="text-gray-700 mb-4">For urgent care needs outside business hours</p>
                <a 
                  href="tel:602-830-0966" 
                  className="inline-flex items-center text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors"
                >
                  <Phone className="mr-3" size={20} />
                  602-830-0966
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h3>
            <p className="text-xl text-gray-700 mb-8">
              Ready to learn more about our care services? Contact us today for a free consultation.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <a href="tel:602-830-0966" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                    602-830-0966
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a href="mailto:info@butterflyproviders.com" className="text-purple-500 font-semibold hover:text-purple-600 transition-colors">
                    info@butterflyproviders.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Response Time</p>
                  <p className="text-gray-700">Within 2 hours during business hours</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="font-semibold text-gray-900">Request Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                  <Textarea
                    placeholder="Tell us about your care needs..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                  <Button 
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 h-auto"
                  >
                    {contactMutation.isPending ? 'Submitting...' : 'Request Free Consultation'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
