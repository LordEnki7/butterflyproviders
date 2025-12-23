import { ArrowLeft, Users, Heart, Coffee, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Companionship() {
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
          <h1 className="text-2xl font-bold text-gray-900">Companionship Services</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Companionship Services</h2>
              <p className="text-lg text-gray-600">Meaningful connections and social engagement</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Loneliness and social isolation can significantly impact physical and mental health. Our companionship services provide meaningful social interaction, emotional support, and engaging activities to enhance quality of life and promote overall well-being.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Activities</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Engaging conversation and active listening</li>
              <li>• Board games, puzzles, and card games</li>
              <li>• Reading together and storytelling</li>
              <li>• Arts and crafts activities</li>
              <li>• Music appreciation and singing</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Outdoor Activities</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Walking and light exercise</li>
              <li>• Gardening and plant care</li>
              <li>• Visits to parks and gardens</li>
              <li>• Shopping trips and errands</li>
              <li>• Attending community events</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Technology Support</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Video calls with family and friends</li>
              <li>• Social media assistance</li>
              <li>• Entertainment streaming guidance</li>
              <li>• Online learning and classes</li>
              <li>• Digital communication help</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Emotional Support</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Active listening and emotional validation</li>
              <li>• Encouragement and motivation</li>
              <li>• Grief support and coping assistance</li>
              <li>• Mental stimulation activities</li>
              <li>• Positive social interaction</li>
            </ul>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Benefits of Companionship Care</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Mental Health Benefits</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Reduced feelings of loneliness and depression</li>
                <li>• Improved cognitive function and memory</li>
                <li>• Enhanced mood and emotional well-being</li>
                <li>• Increased motivation and engagement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Physical Health Benefits</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Increased physical activity and mobility</li>
                <li>• Better sleep patterns and appetite</li>
                <li>• Reduced stress and anxiety levels</li>
                <li>• Overall improved quality of life</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Companionship Approach</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized Matching</h4>
              <p className="text-gray-600 text-sm">We carefully match companions based on interests, personality, and compatibility.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Coffee className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexible Activities</h4>
              <p className="text-gray-600 text-sm">Activities are tailored to your interests, abilities, and preferences.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Music className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Engaging Programs</h4>
              <p className="text-gray-600 text-sm">We offer diverse activities to keep you mentally and socially engaged.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Experience the Joy of Companionship</h3>
          <p className="mb-6 text-purple-50">Let us help you stay connected and engaged with meaningful relationships.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scheduling">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Schedule a Visit
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
              <a href="tel:602-830-0966">Call 602-830-0966</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}