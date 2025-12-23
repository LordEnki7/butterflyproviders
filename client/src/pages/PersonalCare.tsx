import { ArrowLeft, Heart, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function PersonalCare() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Personal Care Services</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Heart className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Personal Care Services</h2>
              <p className="text-lg text-gray-600">Compassionate assistance with daily living activities</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Our personal care services are designed to help you maintain your independence and dignity while receiving the assistance you need with daily activities. Our trained caregivers provide compassionate, professional support tailored to your specific needs and preferences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Bathing & Hygiene</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Assistance with bathing and showering</li>
              <li>• Hair washing and styling</li>
              <li>• Oral hygiene and dental care</li>
              <li>• Grooming and personal appearance</li>
              <li>• Nail care and foot care</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dressing & Mobility</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Help with dressing and undressing</li>
              <li>• Assistance with mobility and transfers</li>
              <li>• Walking support and fall prevention</li>
              <li>• Use of mobility aids and equipment</li>
              <li>• Physical therapy assistance</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Medication Management</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Medication reminders and scheduling</li>
              <li>• Assistance with pill organization</li>
              <li>• Monitoring for side effects</li>
              <li>• Communication with healthcare providers</li>
              <li>• Emergency medication protocols</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Continence Care</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Toileting assistance and reminders</li>
              <li>• Incontinence care and management</li>
              <li>• Catheter care and monitoring</li>
              <li>• Skin care and hygiene maintenance</li>
              <li>• Dignity and privacy protection</li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Our Personal Care Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Trained Professionals</h4>
              <p className="text-gray-600 text-sm">All caregivers are thoroughly trained, background-checked, and certified in personal care assistance.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Compassionate Care</h4>
              <p className="text-gray-600 text-sm">We provide dignified, respectful care that preserves your independence and self-esteem.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
              <p className="text-gray-600 text-sm">Available 24/7 with flexible scheduling to meet your specific needs and preferences.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Learn More About Personal Care?</h3>
          <p className="mb-6 text-emerald-50">Contact us today for a consultation and personalized care plan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scheduling">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Schedule Consultation
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600" asChild>
              <a href="tel:602-830-0966">Call 602-830-0966</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}