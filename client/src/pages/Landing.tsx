import { useEffect } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ClientPortal from '@/components/ClientPortal';
import HoursContact from '@/components/HoursContact';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionMenu from '@/components/FloatingActionMenu';

export default function Landing() {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "Butterfly Providers - Professional Non-Medical Home Care Services";
    
    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Professional non-medical home care services in Arizona. Personal care, companionship, meal prep, transportation, and specialized Alzheimer\'s support. Licensed & insured. Call 602-830-0966.');
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '80px' }}>
      <MainNavigation />
      <main>
        <Hero />
        <Services />
        <ClientPortal />
        <HoursContact />
        <Testimonials />
        <About />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingActionMenu />
    </div>
  );
}
