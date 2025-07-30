import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Compassionate Care <br />
              <span className="text-emerald-600">In Your Home</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Professional, non-medical home care services designed to help you or your loved ones maintain independence and dignity in the comfort of home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 text-white px-8 py-4 text-lg font-semibold hover:bg-emerald-700 h-auto"
              >
                Schedule Consultation
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 text-lg font-semibold hover:bg-emerald-600 hover:text-white h-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=800&h=600" 
              alt="Joyful Black woman caregiver with elderly woman in sunny garden - companionship and home care" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover" 
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">24/7 Care Available</p>
                  <p className="text-sm text-gray-600">Licensed & Insured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
