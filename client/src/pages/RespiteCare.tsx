import { ArrowLeft, Coffee, Users, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function RespiteCare() {
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
          <h1 className="text-2xl font-bold text-gray-900">Respite Care for Families</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <Coffee className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Respite Care for Families</h2>
              <p className="text-lg text-gray-600">Taking care of the caregiver with temporary relief services</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Family caregivers need and deserve breaks to rest, recharge, and attend to their own needs. Our respite care services provide temporary relief for family caregivers while ensuring your loved one receives the same high-quality, compassionate care they're accustomed to.
          </p>
        </div>

        {/* Types of Respite Care */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hourly Respite Care</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 2-8 hour care sessions</li>
              <li>• Perfect for appointments or errands</li>
              <li>• Social events and personal time</li>
              <li>• Same-day availability when possible</li>
              <li>• Flexible scheduling options</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Overnight Respite</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 12-24 hour continuous care</li>
              <li>• Full night's rest for family caregivers</li>
              <li>• Weekend getaway opportunities</li>
              <li>• Emergency respite services</li>
              <li>• Experienced overnight caregivers</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Extended Respite</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Multi-day care arrangements</li>
              <li>• Vacation and travel support</li>
              <li>• Planned surgery or hospital stays</li>
              <li>• Caregiver illness coverage</li>
              <li>• Long-term care planning assistance</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Planned & Emergency</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Scheduled regular respite sessions</li>
              <li>• Last-minute emergency coverage</li>
              <li>• Family emergency response</li>
              <li>• Backup caregiver arrangements</li>
              <li>• 24/7 availability for urgent needs</li>
            </ul>
          </div>
        </div>

        {/* Caregiver Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Benefits for Family Caregivers</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Physical & Mental Health</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Reduced caregiver stress and burnout</li>
                <li>• Time for personal medical appointments</li>
                <li>• Improved sleep and rest opportunities</li>
                <li>• Physical activity and exercise time</li>
                <li>• Mental health and wellness support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Personal & Social Life</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Quality time with family and friends</li>
                <li>• Pursuing hobbies and interests</li>
                <li>• Maintaining work-life balance</li>
                <li>• Social activities and events</li>
                <li>• Personal errands and responsibilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's Included in Respite Care</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Personal Care</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Assistance with bathing and hygiene</li>
                <li>• Medication management and reminders</li>
                <li>• Mobility assistance and transfers</li>
                <li>• Meal preparation and feeding assistance</li>
                <li>• Continence care and toileting help</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Companionship</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Engaging conversation and activities</li>
                <li>• Games, puzzles, and entertainment</li>
                <li>• Light exercise and movement</li>
                <li>• Reading and music enjoyment</li>
                <li>• Emotional support and comfort</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Household Support</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Light housekeeping and tidying</li>
                <li>• Meal preparation and cleanup</li>
                <li>• Laundry and clothing care</li>
                <li>• Pet care and feeding</li>
                <li>• Safety monitoring and supervision</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Specialized Care */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Specialized Respite Services</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">Dementia & Alzheimer's Respite</h4>
              <p className="text-gray-700">Specialized caregivers trained in memory care techniques and behavioral management for clients with cognitive impairments.</p>
            </div>
            <div className="border-l-4 border-green-400 pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">Post-Hospital Recovery Respite</h4>
              <p className="text-gray-700">Skilled care for clients recovering from surgery, illness, or injury requiring specialized attention and monitoring.</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">End-of-Life Respite Support</h4>
              <p className="text-gray-700">Compassionate palliative and hospice support care allowing family members time to process and recharge.</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Our Respite Care</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Experienced Team</h4>
              <p className="text-gray-600 text-sm">Our respite caregivers are specially trained in temporary care transitions and family dynamics.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
              <p className="text-gray-600 text-sm">From a few hours to several days, we accommodate your schedule and needs.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Peace of Mind</h4>
              <p className="text-gray-600 text-sm">Know your loved one is in capable, caring hands while you take time for yourself.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Take Time for Yourself</h3>
          <p className="mb-6 text-green-50">You deserve a break. Let us provide the respite care you and your family need.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scheduling">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Schedule Respite Care
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" asChild>
              <a href="tel:602-830-0966">Call 602-830-0966</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}