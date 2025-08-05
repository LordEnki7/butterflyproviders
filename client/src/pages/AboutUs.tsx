import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionMenu from '@/components/FloatingActionMenu';
import { ArrowLeft, Heart, Shield, Users, Clock } from 'lucide-react';
import { Link } from 'wouter';

export default function AboutUs() {
  useEffect(() => {
    document.title = 'About Us - Butterfly Providers';
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '60px' }}>
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
              About <span className="text-emerald-600">Butterfly Providers</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We're dedicated to providing compassionate, professional home care services that help you and your loved ones maintain independence and dignity in the comfort of home.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg leading-relaxed">
                    Founded with a deep commitment to enhancing the quality of life for seniors and individuals with special needs, Butterfly Providers emerged from a simple belief: everyone deserves to age gracefully and live independently in their own home.
                  </p>
                  <p>
                    Our journey began when we recognized the growing need for reliable, compassionate non-medical home care services. We saw families struggling to balance work, personal commitments, and caring for their loved ones, and we knew we could make a difference.
                  </p>
                  <p>
                    Today, we're proud to serve families throughout the community, providing personalized care plans that respect individual preferences, cultural values, and family dynamics.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-gradient-to-br from-emerald-100 to-purple-100 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="text-white" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h3>
                      <p className="text-gray-700">
                        To provide exceptional, personalized home care services that promote independence, dignity, and quality of life for every client we serve.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                These principles guide everything we do and ensure we deliver the highest quality care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  description: "We treat every client with genuine care, empathy, and understanding."
                },
                {
                  icon: Shield,
                  title: "Trust",
                  description: "We build lasting relationships based on reliability, honesty, and transparency."
                },
                {
                  icon: Users,
                  title: "Respect",
                  description: "We honor individual preferences, cultural values, and personal dignity."
                },
                {
                  icon: Clock,
                  title: "Excellence",
                  description: "We strive for the highest standards in every aspect of our service."
                }
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Butterfly Providers</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                We're more than just a care provider – we're your partners in maintaining independence and quality of life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Licensed & Insured",
                  description: "Fully licensed and insured for your peace of mind and protection."
                },
                {
                  title: "24/7 Availability",
                  description: "Round-the-clock care options to meet your scheduling needs."
                },
                {
                  title: "Personalized Care Plans",
                  description: "Customized services tailored to individual preferences and requirements."
                },
                {
                  title: "Experienced Caregivers",
                  description: "Thoroughly vetted, trained, and compassionate care professionals."
                },
                {
                  title: "Family Communication",
                  description: "Regular updates and open communication with family members."
                },
                {
                  title: "Affordable Rates",
                  description: "Competitive pricing with transparent, no-hidden-fee structure."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let us create a personalized care plan for you or your loved one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 font-semibold transition-all duration-200 hover:scale-105"
              >
                Schedule Free Consultation
              </Button>
              <Button 
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 font-semibold transition-all duration-200"
              >
                <a href="tel:602-830-0966">Call Now: 602-830-0966</a>
              </Button>
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