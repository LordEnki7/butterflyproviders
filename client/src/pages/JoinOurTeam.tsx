import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft, Heart, Users, Shield } from 'lucide-react';
import { Link } from 'wouter';
import healthcarePhoto from '@assets/stock_images/professional_healthc_a263da21.jpg';

export default function JoinOurTeam() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Join Our Team - Butterfly Providers';
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '110px' }}>
      <MainNavigation />
      
      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link href="/">
            <Button variant="outline" className="group hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>

        <section className="bg-gradient-to-br from-emerald-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Join Our <span className="text-emerald-600">Care Team</span>
                </h1>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Looking for a rewarding job that provides a sense of joy and fulfillment? Great, Butterfly Providers are looking for compassionate in-home companion caregivers (non-medical aide). No work experience, no problem – we offer full on the job training. Click the link below and apply today!
                  </p>
                </div>
                <Link href="/apply">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-bold h-auto transition-all duration-200 hover:scale-105 shadow-lg"
                    data-testid="button-apply-today"
                  >
                    APPLY TODAY
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <img 
                  src={healthcarePhoto}
                  alt="Healthcare professional helping patient"
                  className="rounded-2xl shadow-xl w-full max-w-md h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Why Join <span className="text-emerald-600">Butterfly Providers?</span>
            </h2>
            <div className="bg-gradient-to-br from-emerald-50 to-purple-50 p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                <p>
                  At Butterfly Providers, we believe caregivers are the heart of everything we do. We are committed to creating a supportive, respectful workplace where team members feel valued, heard, and empowered to make a meaningful difference every day. When you join our team, you become part of a mission-driven organization that prioritizes compassion, integrity, and quality care.
                </p>
                <p>
                  We understand that great care starts with supporting our caregivers. That's why we focus on clear communication, consistent scheduling, ongoing support, and opportunities for growth. Our team members are treated with dignity and professionalism, and we foster an environment where your work is appreciated and your contributions truly matter.
                </p>
                <p>
                  Inspired by the butterfly's transformation, we believe in growth—not only for those we serve, but for our caregivers as well. At Butterfly Providers, you're more than an employee; you're a trusted partner in helping individuals live with independence, confidence, and respect. If you're passionate about helping others and want to be part of a caring, purpose-driven team, Butterfly Providers is the place for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Meaningful Work</h3>
                <p className="text-gray-600">Make a real difference in people's lives every day</p>
              </div>
              <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Schedule</h3>
                <p className="text-gray-600">Work-life balance with scheduling options</p>
              </div>
              <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Training</h3>
                <p className="text-gray-600">Comprehensive on-the-job training provided</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Start your rewarding career as a caregiver today. Click below to complete your application.
            </p>
            <Link href="/apply">
              <Button 
                className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold h-auto transition-all duration-200 hover:scale-105 shadow-lg"
                data-testid="button-apply-cta"
              >
                APPLY TODAY
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
