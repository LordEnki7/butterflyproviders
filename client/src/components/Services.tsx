import { Users, Utensils, Car, Brain, Home, HandHeart } from 'lucide-react';
import { Link } from 'wouter';

const services = [
  {
    title: "Personal Care",
    icon: HandHeart,
    color: "purple",
    link: "/services/personal-care"
  },
  {
    title: "Companionship", 
    icon: Users,
    color: "orange",
    link: "/services/companionship"
  },
  {
    title: "Meal Preparation",
    icon: Utensils,
    color: "blue",
    link: "/services/meal-prep"
  },
  {
    title: "Transportation",
    icon: Car,
    color: "pink",
    link: "/services/transportation"
  },
  {
    title: "Dementia Support",
    icon: Brain,
    color: "emerald",
    link: "/services/dementia-support"
  },
  {
    title: "Respite Care",
    icon: Home,
    color: "gray",
    link: "/services/respite-care"
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
              <Link key={index} href={service.link}>
                <div 
                  className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
