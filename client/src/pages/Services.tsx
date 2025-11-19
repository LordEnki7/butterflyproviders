import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionMenu from '@/components/FloatingActionMenu';
import ConsultationBookingWidget from '@/components/ConsultationBookingWidget';
import { ArrowLeft, Users, Utensils, Car, Brain, Home, HandHeart, Clock, Stethoscope, Moon, Heart } from 'lucide-react';
import { Link } from 'wouter';

const services = [
  {
    title: "Personal Care",
    description: "Comprehensive assistance with activities of daily living including bathing, dressing, grooming, toileting, and mobility support. Our compassionate caregivers help maintain dignity and independence while ensuring safety and comfort.",
    details: [
      "Bathing and personal hygiene assistance",
      "Dressing and grooming support", 
      "Medication reminders",
      "Mobility and transfer assistance",
      "Incontinence care"
    ],
    icon: HandHeart,
    color: "purple",
    bgGradient: "from-purple-100 to-purple-50"
  },
  {
    title: "Companionship",
    description: "Meaningful social interaction and emotional support to combat loneliness and maintain mental well-being. Our caregivers provide friendly conversation, engage in activities, and offer genuine companionship.",
    details: [
      "Friendly conversation and social interaction",
      "Engaging activities and hobbies",
      "Reading and playing games",
      "Light exercise and walks",
      "Emotional support and encouragement"
    ],
    icon: Users,
    color: "orange",
    bgGradient: "from-orange-100 to-orange-50"
  },
  {
    title: "Meal Preparation & Light Housekeeping",
    description: "Nutritious meal planning and preparation, along with light housekeeping services to maintain a clean, comfortable, and healthy living environment.",
    details: [
      "Meal planning and preparation",
      "Grocery shopping assistance",
      "Light cleaning and tidying",
      "Laundry and linen care",
      "Kitchen cleanup and organization"
    ],
    icon: Utensils,
    color: "yellow",
    bgGradient: "from-yellow-100 to-yellow-50"
  },
  {
    title: "Transportation & Errands",
    description: "Safe and reliable transportation services to medical appointments, shopping, and social activities. We help maintain independence by assisting with daily errands and community engagement.",
    details: [
      "Medical appointment transportation",
      "Grocery and pharmacy trips",
      "Social and recreational outings",
      "Banking and post office visits",
      "Accompaniment to appointments"
    ],
    icon: Car,
    color: "pink",
    bgGradient: "from-pink-100 to-pink-50"
  },
  {
    title: "Alzheimer's & Dementia Support",
    description: "Specialized care for individuals with memory challenges, providing routine, comfort, and cognitive stimulation. Our trained caregivers understand the unique needs of dementia care.",
    details: [
      "Memory care and cognitive stimulation",
      "Routine establishment and maintenance",
      "Behavioral support and redirection",
      "Family communication and updates",
      "Specialized dementia training"
    ],
    icon: Brain,
    color: "emerald",
    bgGradient: "from-emerald-100 to-emerald-50"
  },
  {
    title: "Respite Care",
    description: "Temporary relief for family caregivers, providing professional care so you can rest, work, or attend to other needs. Available for a few hours or extended periods.",
    details: [
      "Short-term and long-term respite",
      "Flexible scheduling options",
      "Emergency respite availability",
      "Professional caregiver relief",
      "Peace of mind for families"
    ],
    icon: Clock,
    color: "blue",
    bgGradient: "from-blue-100 to-blue-50"
  },
  {
    title: "Surgery Recovery",
    description: "Post-surgical care and support to ensure safe recovery at home. Our caregivers assist with wound care monitoring, medication management, and mobility assistance during healing.",
    details: [
      "Post-operative care support",
      "Wound care monitoring",
      "Medication management",
      "Physical therapy assistance",
      "Recovery progress tracking"
    ],
    icon: Stethoscope,
    color: "teal",
    bgGradient: "from-teal-100 to-teal-50"
  },
  {
    title: "Live-in Overnight Care",
    description: "24-hour care services providing continuous support and supervision. Our caregivers stay overnight or live-in to ensure safety, security, and immediate assistance when needed.",
    details: [
      "24-hour continuous care",
      "Overnight supervision and safety",
      "Emergency response availability",
      "Sleep assistance and monitoring",
      "Around-the-clock peace of mind"
    ],
    icon: Moon,
    color: "indigo",
    bgGradient: "from-indigo-100 to-indigo-50"
  },
  {
    title: "Hospice Care",
    description: "Compassionate end-of-life care focusing on comfort, dignity, and quality of life. Our specialized caregivers work with hospice teams to provide supportive care for patients and families.",
    details: [
      "End-of-life comfort care",
      "Family support and guidance",
      "Coordination with hospice teams",
      "Emotional and spiritual support",
      "Dignified and compassionate care"
    ],
    icon: Heart,
    color: "rose",
    bgGradient: "from-rose-100 to-rose-50"
  }
];

const colorMap = {
  purple: "bg-purple-500 text-purple-500",
  orange: "bg-orange-500 text-orange-500", 
  yellow: "bg-yellow-500 text-yellow-500",
  pink: "bg-pink-500 text-pink-500",
  emerald: "bg-emerald-600 text-emerald-600",
  blue: "bg-blue-500 text-blue-500",
  teal: "bg-teal-500 text-teal-500",
  indigo: "bg-indigo-500 text-indigo-500",
  rose: "bg-rose-500 text-rose-500"
};

export default function Services() {
  useEffect(() => {
    document.title = 'Our Services - Butterfly Providers';
  }, []);

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
              Our <span className="text-emerald-600">Care Services</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Comprehensive non-medical home care services designed to help you maintain independence and quality of life in the comfort of your own home.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const iconBgColor = colorMap[service.color as keyof typeof colorMap].split(' ')[0];
                const textColor = colorMap[service.color as keyof typeof colorMap].split(' ')[1];
                
                return (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br ${service.bgGradient} p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <div className={`w-16 h-16 ${iconBgColor} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-6">{service.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Our services include:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {service.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <span className="text-emerald-600 mr-2">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA Section with Consultation Widget */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Contact us today for a consultation to discuss your specific care needs and develop a personalized care plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <ConsultationBookingWidget size="lg" />
                  <Button 
                    variant="outline"
                    asChild
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 font-semibold transition-all duration-200"
                  >
                    <a href="tel:602-830-0966">Call: 602-830-0966</a>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <ConsultationBookingWidget variant="card" className="max-w-sm" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
      <FloatingActionMenu />
    </div>
  );
}