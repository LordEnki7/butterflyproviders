import { ArrowLeft, Car, MapPin, ShoppingBag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Transportation() {
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
          <h1 className="text-2xl font-bold text-gray-900">Transportation & Errands</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Transportation & Errands</h2>
              <p className="text-lg text-gray-600">Safe, reliable transportation for all your needs</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Maintaining independence often depends on reliable transportation. Our transportation and errand services ensure you can safely travel to appointments, social activities, and essential errands while staying connected to your community.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Medical Transportation</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Doctor and specialist appointments</li>
              <li>• Hospital and urgent care visits</li>
              <li>• Physical therapy and rehabilitation</li>
              <li>• Diagnostic testing and lab work</li>
              <li>• Medical procedure transportation</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Shopping & Errands</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Grocery shopping assistance</li>
              <li>• Pharmacy and prescription pickup</li>
              <li>• Banking and post office visits</li>
              <li>• Personal shopping trips</li>
              <li>• Government office appointments</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Activities</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Religious services and community events</li>
              <li>• Senior center and social gatherings</li>
              <li>• Cultural events and entertainment</li>
              <li>• Visiting family and friends</li>
              <li>• Recreation and hobby activities</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Services</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Hair salon and beauty appointments</li>
              <li>• Legal and financial consultations</li>
              <li>• Home maintenance service visits</li>
              <li>• Pet care and veterinary visits</li>
              <li>• Other personal appointments</li>
            </ul>
          </div>
        </div>

        {/* Safety Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Safety & Comfort Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Vehicle Safety</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Fully insured and licensed drivers</li>
                <li>• Regular vehicle maintenance and inspection</li>
                <li>• Wheelchair accessible vehicles available</li>
                <li>• GPS tracking for family peace of mind</li>
                <li>• Emergency communication systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Comfort & Assistance</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Door-to-door service with assistance</li>
                <li>• Help with mobility aids and equipment</li>
                <li>• Companionship during appointments</li>
                <li>• Package and bag carrying assistance</li>
                <li>• Weather protection and comfort</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Service Areas & Scheduling</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                Coverage Areas
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Greater Phoenix Metro Area</li>
                <li>• Scottsdale and Paradise Valley</li>
                <li>• Tempe and Mesa</li>
                <li>• Glendale and Peoria</li>
                <li>• Chandler and Gilbert</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="h-5 w-5 text-green-500 mr-2" />
                Scheduling Options
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Same-day appointments available</li>
                <li>• Recurring transportation schedules</li>
                <li>• Advanced booking for planning</li>
                <li>• Flexible timing and routes</li>
                <li>• Emergency transportation services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <ShoppingBag className="h-5 w-5 text-purple-500 mr-2" />
                Additional Services
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Prescription delivery service</li>
                <li>• Grocery delivery options</li>
                <li>• Wait time during appointments</li>
                <li>• Multiple stop itineraries</li>
                <li>• Special event transportation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Our Transportation Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Professional Drivers</h4>
              <p className="text-gray-600 text-sm">Experienced, background-checked drivers trained in senior transportation safety.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reliable Service</h4>
              <p className="text-gray-600 text-sm">Punctual, dependable transportation you can count on for all your needs.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
              <p className="text-gray-600 text-sm">Accommodating schedules to meet your specific timing and appointment needs.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Get Where You Need To Go</h3>
          <p className="mb-6 text-blue-50">Safe, reliable transportation services to keep you connected and independent.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scheduling">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule Transportation
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <a href="tel:602-830-0966">Call 602-830-0966</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}