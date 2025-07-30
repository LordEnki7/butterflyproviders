import { Shield, Heart, Clock, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: "Licensed & Insured",
    description: "Fully licensed, bonded, and insured for your peace of mind.",
    color: "bg-emerald-600"
  },
  {
    icon: Heart,
    title: "Compassionate Caregivers",
    description: "Carefully screened, trained professionals who truly care.",
    color: "bg-purple-500"
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "From a few hours to 24/7 care, we adapt to your needs.",
    color: "bg-orange-500"
  },
  {
    icon: Shield,
    title: "Background Checked",
    description: "Comprehensive background checks and ongoing training.",
    color: "bg-pink-500"
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Butterfly Providers?</h2>
            <p className="text-xl text-gray-700 mb-8">
              We believe everyone deserves to age with dignity and independence in the comfort of their own home. Our experienced, compassionate caregivers provide personalized care that evolves with your needs.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 ${feature.color} rounded-full flex items-center justify-center mt-1`}>
                      <Icon className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-700">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional home care team" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
