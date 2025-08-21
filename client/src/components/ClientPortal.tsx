import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Lock, Calendar, MessageSquare, CreditCard, FileText } from 'lucide-react';
import { Link } from 'wouter';

export default function ClientPortal() {
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: FileText, text: "Real-time care updates and notes" },
    { icon: Calendar, text: "Schedule management and appointments" },
    { icon: MessageSquare, text: "Secure messaging with care team" },
    { icon: CreditCard, text: "Billing and payment management" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
              alt="Professional home care technology platform" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover" 
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Secure Client Portal</h2>
            <p className="text-xl text-gray-700 mb-8">
              Access your care plan, schedule updates, caregiver notes, and billing information through our secure, HIPAA-compliant client portal.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <Check className="text-white" size={16} />
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {!isAuthenticated && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Client Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Access your secure client portal to view care updates, schedules, and communicate with your care team.
                  </p>
                  <Link href="/login">
                    <Button 
                      className="w-full bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 h-auto"
                    >
                      <Lock className="mr-2" size={20} />
                      Secure Client Portal
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-600 text-center">
                    Need help? <a href="#contact" className="text-emerald-600 hover:underline">Contact Support</a>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
