import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionMenu from '@/components/FloatingActionMenu';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function Services() {
  useEffect(() => {
    document.title = 'Our Services - Butterfly Providers';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="pt-8">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link href="/">
            <Button variant="outline" className="group hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-emerald-600">Care Services</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Comprehensive non-medical home care services designed to help you maintain independence and quality of life in the comfort of your own home.
            </p>
          </div>
        </section>

        {/* Services Content Placeholder */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-emerald-50 to-purple-50 p-12 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Details Coming Soon</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                We're currently updating our service information to provide you with the most comprehensive details about our care offerings.
              </p>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our services include Personal Care, Companionship, Meal Preparation, Transportation, Alzheimer's & Dementia Support, and Respite Care for Families.
                </p>
                <p className="text-gray-600">
                  For immediate information about our services, please contact us directly.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 font-semibold transition-all duration-200 hover:scale-105"
                >
                  Contact Us for Details
                </Button>
                <Button 
                  variant="outline"
                  asChild
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 font-semibold transition-all duration-200"
                >
                  <a href="tel:602-830-0966">Call: 602-830-0966</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
      <FloatingActionMenu />
    </div>
  );
}