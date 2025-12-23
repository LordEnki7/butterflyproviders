import { ArrowLeft, Brain, Heart, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function DementiaSupport() {
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
          <h1 className="text-2xl font-bold text-gray-900">Alzheimer's & Dementia Support</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Brain className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Alzheimer's & Dementia Support</h2>
              <p className="text-lg text-gray-600">Specialized care for memory-related conditions</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Caring for someone with Alzheimer's disease or dementia requires specialized knowledge, patience, and compassion. Our trained caregivers provide expert memory care services designed to maintain dignity, safety, and quality of life while supporting both clients and their families.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Memory Care Support</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Cognitive stimulation activities and games</li>
              <li>• Memory exercises and brain training</li>
              <li>• Routine establishment and maintenance</li>
              <li>• Orientation and reality therapy</li>
              <li>• Reminiscence therapy and life review</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety & Supervision</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 24/7 supervision and monitoring</li>
              <li>• Wandering prevention and management</li>
              <li>• Fall risk assessment and prevention</li>
              <li>• Medication management and reminders</li>
              <li>• Emergency response protocols</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Daily Living Assistance</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Personal care and hygiene assistance</li>
              <li>• Meal preparation and nutrition support</li>
              <li>• Dressing and grooming assistance</li>
              <li>• Toilet and continence care</li>
              <li>• Sleep pattern monitoring and support</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Behavioral Support</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Sundown syndrome management</li>
              <li>• Agitation and anxiety reduction techniques</li>
              <li>• Redirection and calming strategies</li>
              <li>• Communication enhancement methods</li>
              <li>• Social engagement and interaction</li>
            </ul>
          </div>
        </div>

        {/* Specialized Approaches */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Specialized Approaches</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Person-Centered Care</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Individualized care plans based on personal history</li>
                <li>• Respect for personal preferences and routines</li>
                <li>• Maintaining dignity and independence</li>
                <li>• Honoring cultural and spiritual needs</li>
                <li>• Family involvement in care planning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Therapeutic Activities</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Music and art therapy sessions</li>
                <li>• Pet therapy and animal interaction</li>
                <li>• Gardening and nature activities</li>
                <li>• Sensory stimulation programs</li>
                <li>• Physical exercise and movement therapy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stages of Care */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Care Across All Stages</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-green-400 pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">Early Stage Dementia</h4>
              <p className="text-gray-700">Focus on maintaining independence, social connections, and cognitive function through structured activities and gentle assistance.</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">Moderate Stage Dementia</h4>
              <p className="text-gray-700">Increased supervision and assistance with daily activities while maintaining comfort, dignity, and meaningful engagement.</p>
            </div>
            <div className="border-l-4 border-red-400 pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">Advanced Stage Dementia</h4>
              <p className="text-gray-700">Comprehensive care focusing on comfort, safety, and quality of life with specialized techniques for non-verbal communication.</p>
            </div>
          </div>
        </div>

        {/* Family Support */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Family Support Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Education & Training</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Understanding dementia progression</li>
                <li>• Communication strategies</li>
                <li>• Behavioral management techniques</li>
                <li>• Safety planning and home modifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Emotional Support</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Caregiver stress management</li>
                <li>• Grief and loss counseling referrals</li>
                <li>• Support group connections</li>
                <li>• Respite care coordination</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Care Coordination</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Healthcare provider communication</li>
                <li>• Care plan updates and adjustments</li>
                <li>• Resource and referral assistance</li>
                <li>• Long-term care planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Our Dementia Care</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-indigo-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Specialized Training</h4>
              <p className="text-gray-600 text-sm">Our caregivers receive extensive training in dementia care techniques and best practices.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Compassionate Approach</h4>
              <p className="text-gray-600 text-sm">We provide patient, understanding care that honors the person behind the disease.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Safety First</h4>
              <p className="text-gray-600 text-sm">Comprehensive safety protocols ensure a secure environment for those with memory impairments.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Specialized Memory Care You Can Trust</h3>
          <p className="mb-6 text-indigo-50">Expert dementia care that preserves dignity and enhances quality of life.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scheduling">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Schedule Consultation
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600" asChild>
              <a href="tel:602-830-0966">Call 602-830-0966</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}