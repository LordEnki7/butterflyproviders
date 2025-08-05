import { Users, Utensils, Car, Brain, Home, HandHeart, Star, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

const services = [
  {
    title: "Personal Care",
    description: "Assistance with daily activities including bathing, dressing, grooming, and mobility support to maintain dignity and independence.",
    icon: HandHeart,
    color: "purple",
    bgGradient: "from-purple-100 to-purple-50",
    link: "/services/personal-care",
    features: ["Bathing & Grooming", "Mobility Support", "Medication Reminders", "24/7 Availability"],
    popular: true
  },
  {
    title: "Companionship",
    description: "Meaningful social interaction, conversation, and emotional support to combat loneliness and maintain mental well-being.",
    icon: Users,
    color: "orange",
    bgGradient: "from-orange-100 to-orange-50",
    link: "/services/companionship",
    features: ["Social Interaction", "Emotional Support", "Activity Engagement", "Mental Stimulation"]
  },
  {
    title: "Meal Prep & Light Cleaning",
    description: "Nutritious meal preparation and light housekeeping to maintain a clean, comfortable living environment.",
    icon: Utensils,
    color: "yellow",
    bgGradient: "from-yellow-100 to-yellow-50",
    link: "/services/meal-prep",
    features: ["Meal Planning", "Grocery Shopping", "Light Housekeeping", "Kitchen Safety"]
  },
  {
    title: "Transportation & Errands",
    description: "Safe transportation to appointments, shopping assistance, and help with daily errands to maintain independence.",
    icon: Car,
    color: "pink",
    bgGradient: "from-pink-100 to-pink-50",
    link: "/services/transportation",
    features: ["Medical Appointments", "Shopping Assistance", "Social Outings", "Errand Support"]
  },
  {
    title: "Alzheimer's & Dementia Support",
    description: "Specialized care for individuals with memory challenges, providing routine, comfort, and cognitive stimulation.",
    icon: Brain,
    color: "emerald",
    bgGradient: "from-emerald-100 to-emerald-50",
    link: "/services/dementia-support",
    features: ["Memory Care", "Cognitive Stimulation", "Routine Maintenance", "Family Support"],
    specialized: true
  },
  {
    title: "Respite Care for Families",
    description: "Temporary relief for family caregivers, providing professional care so you can rest, work, or attend to other needs.",
    icon: Home,
    color: "gray",
    bgGradient: "from-gray-100 to-gray-50",
    link: "/services/respite-care",
    features: ["Short-term Care", "Family Relief", "Professional Support", "Flexible Scheduling"]
  }
];

const colorMap = {
  purple: "bg-purple-500 text-purple-500",
  orange: "bg-orange-500 text-orange-500", 
  yellow: "bg-yellow-500 text-yellow-500",
  pink: "bg-pink-500 text-pink-500",
  emerald: "bg-emerald-600 text-emerald-600",
  gray: "bg-gray-700 text-gray-700"
};

export default function EnhancedServices() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Care Services</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive non-medical home care services tailored to meet your unique needs and preferences.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-gray-600">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-gray-600">24/7 Available</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const iconBgColor = colorMap[service.color as keyof typeof colorMap].split(' ')[0];
            const textColor = colorMap[service.color as keyof typeof colorMap].split(' ')[1];
            
            return (
              <div 
                key={index}
                className={`relative bg-gradient-to-br ${service.bgGradient} p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {service.popular && (
                    <Badge className="bg-emerald-600 text-white text-xs">Most Popular</Badge>
                  )}
                  {service.specialized && (
                    <Badge className="bg-purple-600 text-white text-xs">Specialized Care</Badge>
                  )}
                </div>

                <div className={`w-16 h-16 ${iconBgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-700 mb-6">{service.description}</p>
                
                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={service.link}>
                  <Button 
                    variant="link" 
                    className={`${textColor} font-semibold hover:underline p-0 h-auto group-hover:translate-x-2 transition-transform duration-200`}
                  >
                    Learn More →
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-purple-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us today for a free consultation and let us create a personalized care plan for you or your loved one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 font-semibold transition-all duration-200 hover:scale-105"
              >
                Schedule Free Consultation
              </Button>
              <Button 
                variant="outline"
                asChild
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 font-semibold transition-all duration-200"
              >
                <a href="tel:602-830-0966">Call Now: 602-830-0966</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}