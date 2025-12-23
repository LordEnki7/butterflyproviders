import { ArrowLeft, ChefHat, Utensils, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function MealPrep() {
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
          <h1 className="text-2xl font-bold text-gray-900">Meal Preparation & Light Cleaning</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-orange-100 rounded-full">
              <ChefHat className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Meal Preparation & Light Cleaning</h2>
              <p className="text-lg text-gray-600">Nutritious meals and a clean, comfortable home environment</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Proper nutrition and a clean living environment are essential for health and well-being. Our meal preparation and light housekeeping services ensure you enjoy nutritious, delicious meals while maintaining a safe and comfortable home environment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Meal Planning & Preparation</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Customized meal planning based on dietary needs</li>
              <li>• Fresh, nutritious meal preparation</li>
              <li>• Special diet accommodation (diabetic, low-sodium, etc.)</li>
              <li>• Meal portioning and storage</li>
              <li>• Kitchen organization and food safety</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Grocery Shopping</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Weekly grocery shopping assistance</li>
              <li>• Fresh produce and quality ingredient selection</li>
              <li>• Budget-conscious shopping strategies</li>
              <li>• Prescription pickup and pharmacy visits</li>
              <li>• Household supply restocking</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Light Housekeeping</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Dusting and vacuuming common areas</li>
              <li>• Kitchen cleaning and dishwashing</li>
              <li>• Bathroom sanitization and cleaning</li>
              <li>• Laundry washing, drying, and folding</li>
              <li>• Bed making and linen changes</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Home Organization</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Decluttering and organizing spaces</li>
              <li>• Safety hazard identification and removal</li>
              <li>• Mail sorting and organization</li>
              <li>• Seasonal clothing rotation</li>
              <li>• General tidying and maintenance</li>
            </ul>
          </div>
        </div>

        {/* Nutrition Focus */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Nutrition & Dietary Considerations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Specialized Diets We Support
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Heart-healthy and low-sodium diets</li>
                <li>• Diabetic meal planning and carb counting</li>
                <li>• Renal (kidney) diet requirements</li>
                <li>• Pureed and soft-textured foods</li>
                <li>• Vegetarian and vegan preferences</li>
                <li>• Gluten-free and allergy considerations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Utensils className="h-5 w-5 text-orange-500 mr-2" />
                Meal Preparation Features
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Fresh ingredients and seasonal produce</li>
                <li>• Proper food safety and hygiene practices</li>
                <li>• Appetizing presentation and portion control</li>
                <li>• Batch cooking for convenience</li>
                <li>• Hydration monitoring and reminders</li>
                <li>• Assistance with eating if needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Our Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ChefHat className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Culinary Expertise</h4>
              <p className="text-gray-600 text-sm">Our caregivers are trained in nutrition and food safety to prepare healthy, delicious meals.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Shopping</h4>
              <p className="text-gray-600 text-sm">We shop efficiently, selecting quality ingredients while staying within your budget.</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Personal Touch</h4>
              <p className="text-gray-600 text-sm">Every meal is prepared with care, considering your preferences and dietary requirements.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-emerald-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Enjoy Fresh Meals & A Clean Home</h3>
          <p className="mb-6 text-orange-50">Let us take care of meal preparation and housekeeping so you can focus on what matters most.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scheduling">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Schedule Service
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
              <a href="tel:602-830-0966" className="text-white hover:text-orange-600">Call 602-830-0966</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}