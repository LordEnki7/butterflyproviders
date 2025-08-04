import { Users, Utensils, Car, Brain, Home, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const services = [
  {
    title: "Personal Care",
    description: "Assistance with daily activities including bathing, dressing, grooming, and mobility support to maintain dignity and independence.",
    icon: HandHeart,
    color: "purple",
    bgGradient: "from-purple-100 to-purple-50",
    link: "/services/personal-care"
  },
  {
    title: "Companionship",
    description: "Meaningful social interaction, conversation, and emotional support to combat loneliness and maintain mental well-being.",
    icon: Users,
    color: "orange",
    bgGradient: "from-orange-100 to-orange-50",
    link: "/services/companionship"
  },
  {
    title: "Meal Prep & Light Cleaning",
    description: "Nutritious meal preparation and light housekeeping to maintain a clean, comfortable living environment.",
    icon: Utensils,
    color: "yellow",
    bgGradient: "from-yellow-100 to-yellow-50",
    link: "/services/meal-prep"
  },
  {
    title: "Transportation & Errands",
    description: "Safe transportation to appointments, shopping assistance, and help with daily errands to maintain independence.",
    icon: Car,
    color: "pink",
    bgGradient: "from-pink-100 to-pink-50",
    link: "/services/transportation"
  },
  {
    title: "Alzheimer's & Dementia Support",
    description: "Specialized care for individuals with memory challenges, providing routine, comfort, and cognitive stimulation.",
    icon: Brain,
    color: "emerald",
    bgGradient: "from-emerald-100 to-emerald-50",
    link: "/services/dementia-support"
  },
  {
    title: "Respite Care for Families",
    description: "Temporary relief for family caregivers, providing professional care so you can rest, work, or attend to other needs.",
    icon: Home,
    color: "gray",
    bgGradient: "from-gray-100 to-gray-50",
    link: "/services/respite-care"
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

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Care Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive non-medical home care services tailored to meet your unique needs and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const iconBgColor = colorMap[service.color as keyof typeof colorMap].split(' ')[0];
            const textColor = colorMap[service.color as keyof typeof colorMap].split(' ')[1];
            
            return (
              <div 
                key={index}
                className={`bg-gradient-to-br ${service.bgGradient} p-8 rounded-2xl hover:shadow-lg transition-shadow`}
              >
                <div className={`w-16 h-16 ${iconBgColor} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-700 mb-6">{service.description}</p>
                <Link href={service.link}>
                  <Button 
                    variant="link" 
                    className={`${textColor} font-semibold hover:underline p-0 h-auto`}
                  >
                    Learn More →
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
