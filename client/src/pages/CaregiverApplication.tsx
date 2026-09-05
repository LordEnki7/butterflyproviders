import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(1, 'Current address is required'),
  hasExperience: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  companyName: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  jobDescription: z.string().optional(),
  reasonForLeaving: z.string().optional(),
  consentBackground: z.boolean().refine(val => val === true, 'You must consent to background check'),
  otherLanguages: z.string().optional(),
  skills: z.string().min(1, 'Please provide your work-related skills'),
  availabilityMornings: z.boolean().optional(),
  availabilityAfternoons: z.boolean().optional(),
  availabilityEvenings: z.boolean().optional(),
  availabilityWeekends: z.boolean().optional(),
  willingOvernight: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  willingAlzheimers: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  willingBehavioral: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  willingPets: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  willingSmoking: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function CaregiverApplication() {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      hasExperience: undefined,
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      jobDescription: '',
      reasonForLeaving: '',
      consentBackground: false,
      otherLanguages: '',
      skills: '',
      availabilityMornings: false,
      availabilityAfternoons: false,
      availabilityEvenings: false,
      availabilityWeekends: false,
      willingOvernight: undefined,
      willingAlzheimers: undefined,
      willingBehavioral: undefined,
      willingPets: undefined,
      willingSmoking: undefined,
    }
  });

  const hasExperience = form.watch('hasExperience');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Caregiver Application - Butterfly Providers';
  }, []);

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      if (resumeFile) {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!allowedTypes.includes(resumeFile.type) || resumeFile.size > 5 * 1024 * 1024) {
          throw new Error('Resume must be a PDF, DOC, or DOCX file no larger than 5 MB.');
        }
      }

      const payload = new FormData();
      payload.append('applicationData', JSON.stringify(data));
      if (resumeFile) payload.append('resume', resumeFile);

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        body: payload,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to submit application');

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We will review your application and contact you soon.",
      });
      form.reset();
      setResumeFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50" style={{ paddingTop: '110px' }}>
      <MainNavigation />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/join-our-team">
              <Button variant="outline" className="group hover:bg-emerald-50 hover:border-emerald-300">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Join Our Team
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Caregiver <span className="text-emerald-600">Application</span>
            </h1>
            <p className="text-gray-600 text-center mb-8">
              All fields marked are required. Please fill out the form completely.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" {...field} data-testid="input-first-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} data-testid="input-last-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-gender">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="(602) 555-1234" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Street, City, State, ZIP" {...field} data-testid="input-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Work Experience</h2>
                  
                  <FormField
                    control={form.control}
                    name="hasExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any work experience as a non-medical caregiver? *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="exp-yes" />
                              <Label htmlFor="exp-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="exp-no" />
                              <Label htmlFor="exp-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {hasExperience === 'yes' && (
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Position" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date (or "Current")</FormLabel>
                              <FormControl>
                                <Input placeholder="Current or End Date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your responsibilities..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="reasonForLeaving"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Leaving (if not current)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Why did you leave this position?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Skills & Languages</h2>
                  
                  <FormField
                    control={form.control}
                    name="otherLanguages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Languages Spoken</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Spanish, French, Sign Language" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please provide a list of work-related skills *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List your relevant skills..." {...field} data-testid="input-skills" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Availability</h2>
                  
                  <div>
                    <Label className="mb-3 block">Please provide your work availability *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="availabilityMornings"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Mornings</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availabilityAfternoons"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Afternoons</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availabilityEvenings"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Evenings</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availabilityWeekends"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Weekends</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="willingOvernight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are you willing to work overnight? *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="overnight-yes" />
                              <Label htmlFor="overnight-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="overnight-no" />
                              <Label htmlFor="overnight-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Client Preferences</h2>
                  <p className="text-gray-600 text-sm">Are you willing to become an in-home non-medical aide to clients with the following attributes?</p>
                  
                  <FormField
                    control={form.control}
                    name="willingAlzheimers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alzheimer's/Dementia clients *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="alz-yes" />
                              <Label htmlFor="alz-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="alz-no" />
                              <Label htmlFor="alz-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="willingBehavioral"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Behavioral/Disability clients *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="behavioral-yes" />
                              <Label htmlFor="behavioral-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="behavioral-no" />
                              <Label htmlFor="behavioral-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="willingPets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clients with pets (Cats, dogs, etc.) *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="pets-yes" />
                              <Label htmlFor="pets-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="pets-no" />
                              <Label htmlFor="pets-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="willingSmoking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comfortable with smoking clients *</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="smoking-yes" />
                              <Label htmlFor="smoking-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="smoking-no" />
                              <Label htmlFor="smoking-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Resume & Consent</h2>
                  
                  <div>
                    <Label className="mb-2 block">Upload Resume</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          if (file && file.size > 5 * 1024 * 1024) {
                            toast({ title: "File too large", description: "Resume must be 5 MB or smaller.", variant: "destructive" });
                            e.target.value = '';
                            setResumeFile(null);
                            return;
                          }
                          setResumeFile(file);
                        }}
                        className="hidden"
                        id="resume-upload"
                        data-testid="input-resume"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          {resumeFile ? resumeFile.name : 'Click to upload your resume (optional — PDF, DOC, DOCX; max 5 MB)'}
                        </p>
                      </label>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="consentBackground"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} data-testid="checkbox-consent" />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-base">
                            I consent to background check and fingerprints *
                          </FormLabel>
                          <p className="text-sm text-gray-500">
                            By checking this box, you agree to undergo a background check and fingerprinting as part of the application process.
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold"
                  data-testid="button-submit-application"
                >
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
