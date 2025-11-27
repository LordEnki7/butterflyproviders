import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ConsultationBookingWidgetProps {
  variant?: 'button' | 'floating' | 'card';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ConsultationBookingWidget({ 
  variant = 'button', 
  size = 'md', 
  className = '' 
}: ConsultationBookingWidgetProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    agreeToContact: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const consultationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest('POST', '/api/consultation', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Consultation Scheduled!",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });
      setTimeout(() => {
        setOpen(false);
        setIsSubmitted(false);
        resetForm();
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "Please try again or call us directly at 602-830-0966.",
        variant: "destructive",
      });
      console.error('Consultation booking error:', error);
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
      agreeToContact: false
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToContact) {
      toast({
        title: "Agreement Required",
        description: "Please agree to be contacted before submitting.",
        variant: "destructive",
      });
      return;
    }
    consultationMutation.mutate(formData);
  };

  const getTriggerButton = () => {
    const baseClasses = "transition-all duration-200 hover:scale-105";
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    if (variant === 'floating') {
      return (
        <Button
          className={`fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white ${baseClasses} ${className}`}
          size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Now
        </Button>
      );
    }

    if (variant === 'card') {
      return (
        <div className={`bg-gradient-to-br from-emerald-50 to-purple-50 p-6 rounded-2xl shadow-lg ${className}`}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Consultation</h3>
            <p className="text-gray-600">
              Schedule a no-obligation consultation to discuss your care needs
            </p>
            <Button
              className={`bg-emerald-600 hover:bg-emerald-700 text-white w-full ${baseClasses} ${sizeClasses[size]}`}
            >
              Schedule Now
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Button
        className={`bg-emerald-600 hover:bg-emerald-700 text-white ${baseClasses} ${sizeClasses[size]} ${className}`}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Consultation
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {getTriggerButton()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
              <p className="text-gray-600">
                Your consultation has been scheduled successfully.
              </p>
              <p className="text-sm text-gray-500">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Schedule Consultation
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  placeholder=""
                />
              </div>

              {/* Consultation Details */}
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date (Optional)</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Contact Time</Label>
                <Select value={formData.preferredTime} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                    <SelectItem value="any">Anytime during office hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your specific needs or questions..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-2 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="consent"
                  checked={formData.agreeToContact}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToContact: checked === true }))}
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I agree to be contacted by Butterfly Providers via phone, email, or text message to discuss my care needs and schedule a consultation. I understand this is a free service with no obligation.
                </Label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  disabled={consultationMutation.isPending || !formData.agreeToContact}
                >
                  {consultationMutation.isPending ? "Scheduling..." : "Schedule Consultation"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}