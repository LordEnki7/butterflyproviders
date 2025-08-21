import { Users, Utensils, Car, Brain, Home, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const services = [
  {
    title: "Personal Care Assistance",
    description: "Comprehensive hands-on care including bathing, dressing, grooming, toileting, feeding assistance, and mobility support.",
    icon: HandHeart,
    color: "purple",
    bgGradient: "from-purple-100 to-purple-50",
    link: "/services"
  },
  {
    title: "Homemaking & Domestic Support", 
    description: "Complete home maintenance including housekeeping, laundry, meal preparation, grocery shopping, and basic pet care.",
    icon: Home,
    color: "blue",
    bgGradient: "from-blue-100 to-blue-50",
    link: "/services"
  },
  {
    title: "Companionship & Emotional Support",
    description: "Social interaction, wellness monitoring, recreational activities, and emotional engagement to enhance quality of life.",
    icon: Users,
    color: "orange",
    bgGradient: "from-orange-100 to-orange-50",
    link: "/services"
  },
  {
    title: "Errands & Transportation Assistance",
    description: "Safe escort services to appointments, grocery trips, errands, and social outings for independence outside the home.",
    icon: Car,
    color: "pink",
    bgGradient: "from-pink-100 to-pink-50",
    link: "/services"
  },
  {
    title: "Specialized Memory Care",
    description: "Expert care and support for individuals with Alzheimer's, dementia, and other memory-related conditions.",
    icon: Brain,
    color: "emerald",
    bgGradient: "from-emerald-100 to-emerald-50",
    link: "/services"
  },
  {
    title: "Additional Support Services",
    description: "Medication reminders, respite care, safety monitoring, light exercise support, and technology assistance.",
    icon: Utensils,
    color: "gray",
    bgGradient: "from-gray-100 to-gray-50",
    link: "/services"
  }
];

const colorMap = {
  purple: "bg-purple-500 text-purple-500",
  blue: "bg-blue-500 text-blue-500",
  orange: "bg-orange-500 text-orange-500",
  pink: "bg-pink-500 text-pink-500",
  emerald: "bg-emerald-600 text-emerald-600",
  gray: "bg-gray-700 text-gray-700"
};

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Care Services</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive non-medical home care services tailored to meet your unique needs and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const iconBgColor = colorMap[service.color as keyof typeof colorMap]?.split(' ')[0] || 'bg-gray-500';
            
            return (
              <div 
                key={index}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600">Professional care services</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Want to learn more about our comprehensive care services?
          </p>
          <Link href="/services/detailed">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 font-semibold transition-all duration-200 hover:scale-105"
            >
              View Detailed Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
