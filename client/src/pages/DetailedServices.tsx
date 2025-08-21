import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionMenu from '@/components/FloatingActionMenu';
import ConsultationBookingWidget from '@/components/ConsultationBookingWidget';
import { ArrowLeft, HandHeart, Home, Users, Car, Brain, Plus, Check } from 'lucide-react';
import { Link } from 'wouter';

const detailedServices = [
  {
    category: "Personal Care Assistance",
    description: "Supports clients with direct, hands-on care to maintain hygiene and physical comfort.",
    icon: HandHeart,
    color: "purple",
    services: [
      "Bathing and grooming",
      "Dressing", 
      "Toileting and incontinence care",
      "Oral hygiene",
      "Feeding assistance",
      "Hair and skin care",
      "Ambulation support",
      "Repositioning and transfers"
    ]
  },
  {
    category: "Homemaking & Domestic Support", 
    description: "Helps clients maintain a clean, organized, and functional home environment.",
    icon: Home,
    color: "blue",
    services: [
      "Light housekeeping",
      "Laundry and linen changes",
      "Meal preparation and planning",
      "Dishwashing",
      "Grocery shopping",
      "Trash removal",
      "Pet care (basic)"
    ]
  },
  {
    category: "Companionship & Emotional Support",
    description: "Addresses the client's emotional and social needs through presence and interaction.",
    icon: Users,
    color: "orange", 
    services: [
      "Friendly conversation",
      "Supervision and wellness monitoring",
      "Recreational activities and games",
      "Reading and hobby assistance",
      "Social and emotional engagement"
    ]
  },
  {
    category: "Errands & Transportation Assistance",
    description: "Supports mobility and independence outside the home.",
    icon: Car,
    color: "pink",
    services: [
      "Escort to non-medical appointments",
      "Grocery/pharmacy trips", 
      "Errand running",
      "Social or spiritual outings"
    ]
  },
  {
    category: "Other Non-Clinical Services",
    description: "General care support services not requiring medical training.",
    icon: Plus,
    color: "emerald",
    services: [
      "Medication reminders",
      "Respite care for family caregivers",
      "Safety monitoring (fall/dementia risk)",
      "Light exercise/stretching support",
      "Tech help (phone/video calls, reminders)"
    ]
  }
];

const colorMap = {
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", icon: "text-purple-500" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", icon: "text-blue-500" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", icon: "text-orange-500" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", icon: "text-pink-500" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", icon: "text-emerald-500" }
};

export default function DetailedServices() {
  useEffect(() => {
    document.title = "Detailed Services - Butterfly Providers | Comprehensive Non-Medical Home Care";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/services">
            <Button variant="outline" className="mb-6 hover:bg-emerald-50 hover:border-emerald-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services Overview
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Care Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our detailed service catalog covers all aspects of non-medical home care, 
            ensuring your loved ones receive the support they need to thrive at home.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {detailedServices.map((serviceCategory, index) => {
            const Icon = serviceCategory.icon;
            const colors = colorMap[serviceCategory.color as keyof typeof colorMap];
            
            return (
              <Card key={index} className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-300`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${colors.bg} border ${colors.border}`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${colors.text}`}>
                        {serviceCategory.category}
                      </h3>
                      <p className="text-sm text-gray-600 font-normal mt-1">
                        {serviceCategory.services.length} Services Available
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{serviceCategory.description}</p>
                  
                  <div className="space-y-2">
                    {serviceCategory.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Complete Care Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-bold mb-2">29</div>
              <div className="text-emerald-100">Total Services Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-emerald-100">Service Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">Care Coordination</div>
            </div>
          </div>
        </div>

        {/* Business Hours Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Business Hours</h3>
          <p className="text-blue-800">
            Our administrative office operates Monday through Friday, 8:00 AM to 5:00 PM. 
            Care services are scheduled according to your personalized care plan.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Personalized Care Plan?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us for a consultation to discuss which services would benefit your family most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:602-830-0966">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg">
                Call 602-830-0966
              </Button>
            </a>
            <ConsultationBookingWidget />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <FloatingActionMenu />
    </div>
  );
}