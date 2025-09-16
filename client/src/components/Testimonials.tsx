import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Family Member",
    role: "Client Family",
    image: "https://ui-avatars.com/api/?name=FM&background=10b981&color=fff&size=100",
    testimonial: "Butterfly Providers has been a blessing for our family. Their caregivers are professional, compassionate, and truly care about wellbeing."
  },
  {
    name: "Client Family",
    role: "Family Member",
    image: "https://ui-avatars.com/api/?name=CF&background=10b981&color=fff&size=100",
    testimonial: "The peace of mind knowing our loved one is in good hands is priceless. The care team communicates regularly and goes above and beyond."
  },
  {
    name: "Care Recipient",
    role: "Client",
    image: "https://ui-avatars.com/api/?name=CR&background=10b981&color=fff&size=100",
    testimonial: "Professional, reliable, and caring. I couldn't ask for better support. Highly recommend Butterfly Providers."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Families Say</h2>
          <p className="text-xl text-gray-600">Trusted by families throughout the community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image}
                    alt={`${testimonial.name} testimonial`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=10b981&color=fff&size=100`;
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
