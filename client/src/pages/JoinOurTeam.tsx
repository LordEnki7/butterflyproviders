import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionMenu from '@/components/FloatingActionMenu';
import { ArrowLeft, Plus, Minus, Users, Heart, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface WorkExperience {
  title: string;
  startDate: string;
  endDate: string;
  reasonForLeaving: string;
}

export default function JoinOurTeam() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workExperience: [] as WorkExperience[],
    backgroundCheckConsent: false,
    fingerprintConsent: false,
    additionalNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Join Our Team - Butterfly Providers';
  }, []);

  const jobApplicationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const applicationData = {
        ...data,
        workExperience: JSON.stringify(data.workExperience)
      };
      return await apiRequest('POST', '/api/job-applications', applicationData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and contact you within 5 business days.",
      });
      setTimeout(() => {
        setIsSubmitted(false);
        resetForm();
      }, 5000);
    },
    onError: (error) => {
      toast({
        title: "Application Failed",
        description: "Please try again or call us directly at 602-830-0966.",
        variant: "destructive",
      });
      console.error('Job application error:', error);
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      workExperience: [],
      backgroundCheckConsent: false,
      fingerprintConsent: false,
      additionalNotes: ''
    });
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { title: '', startDate: '', endDate: '', reasonForLeaving: '' }]
    }));
  };

  const removeWorkExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.backgroundCheckConsent || !formData.fingerprintConsent) {
      toast({
        title: "Consent Required",
        description: "Please agree to both background check and fingerprint requirements.",
        variant: "destructive",
      });
      return;
    }
    if (formData.workExperience.length === 0) {
      toast({
        title: "Work Experience Required",
        description: "Please add at least one work experience entry.",
        variant: "destructive",
      });
      return;
    }
    jobApplicationMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '140px' }}>
      <MainNavigation />
      
      <main className="pt-8">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link href="/">
            <Button variant="outline" className="group hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-emerald-600">Care Team</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Make a meaningful difference in people's lives while building a rewarding career in home care services.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Meaningful Work</h3>
                <p className="text-gray-600">Make a real difference in people's lives every day</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Schedule</h3>
                <p className="text-gray-600">Work-life balance with scheduling options</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Benefits</h3>
                <p className="text-gray-600">Comprehensive training and competitive compensation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Application Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {isSubmitted ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                  <p className="text-lg text-gray-600 mb-2">
                    Thank you for your interest in joining our team.
                  </p>
                  <p className="text-gray-600">
                    We'll review your application and contact you within 5 business days.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-gray-900">
                    Career Application
                  </CardTitle>
                  <p className="text-center text-gray-600">
                    Join our compassionate care team and make a difference in people's lives
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                      
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Work Experience */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                        <Button
                          type="button"
                          onClick={addWorkExperience}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Experience
                        </Button>
                      </div>

                      {formData.workExperience.length === 0 && (
                        <p className="text-gray-500 italic">Click "Add Experience" to add your work history</p>
                      )}

                      {formData.workExperience.map((exp, index) => (
                        <Card key={index} className="p-4 border-l-4 border-emerald-600">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium text-gray-900">Position {index + 1}</h4>
                            <Button
                              type="button"
                              onClick={() => removeWorkExperience(index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <Label htmlFor={`title-${index}`}>Job Title *</Label>
                              <Input
                                id={`title-${index}`}
                                value={exp.title}
                                onChange={(e) => updateWorkExperience(index, 'title', e.target.value)}
                                required
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`startDate-${index}`}>Start Date *</Label>
                              <Input
                                id={`startDate-${index}`}
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                                required
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`endDate-${index}`}>End Date *</Label>
                              <Input
                                id={`endDate-${index}`}
                                type="date"
                                value={exp.endDate}
                                onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                                required
                                className="mt-1"
                              />
                            </div>
                            
                            <div className="md:col-span-2">
                              <Label htmlFor={`reason-${index}`}>Reason for Leaving *</Label>
                              <Input
                                id={`reason-${index}`}
                                value={exp.reasonForLeaving}
                                onChange={(e) => updateWorkExperience(index, 'reasonForLeaving', e.target.value)}
                                required
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Background Check Consent */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Required Consents</h3>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="backgroundCheck"
                          checked={formData.backgroundCheckConsent}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, backgroundCheckConsent: !!checked }))
                          }
                          className="mt-1"
                        />
                        <div>
                          <Label htmlFor="backgroundCheck" className="text-sm font-medium">
                            I consent to a background check *
                          </Label>
                          <p className="text-sm text-gray-600">
                            A background check is required for all caregiving positions to ensure client safety.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="fingerprintCheck"
                          checked={formData.fingerprintConsent}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, fingerprintConsent: !!checked }))
                          }
                          className="mt-1"
                        />
                        <div>
                          <Label htmlFor="fingerprintCheck" className="text-sm font-medium">
                            I consent to fingerprinting *
                          </Label>
                          <p className="text-sm text-gray-600">
                            Fingerprinting is required for all caregiving positions as part of our security screening process.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <Label htmlFor="additionalNotes">Additional Information</Label>
                      <Textarea
                        id="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                        placeholder="Tell us about your motivation for caregiving, relevant certifications, or any other information you'd like to share..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={jobApplicationMutation.isPending}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold text-lg h-auto transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                    >
                      {jobApplicationMutation.isPending ? 'Submitting Application...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
      <FloatingActionMenu />
    </div>
  );
}