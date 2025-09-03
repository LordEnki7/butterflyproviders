import { useState, useEffect } from 'react';
import { Phone, Mail, Shield } from 'lucide-react';
import butterflyLogo from "@assets/IMG_0338_1753896135644.png";

const policies = [
  "Privacy Policy",
  "Terms & Conditions", 
  "Service Agreement",
  "HIPAA Compliance",
  "Code of Ethics"
];

export default function Footer() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger when user has scrolled more than 50px and is near bottom
      setIsScrolled(scrollPosition > 50 && (scrollPosition + windowHeight >= documentHeight - 300));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`bg-gray-900 text-white relative overflow-hidden transition-all duration-300 ${
      isScrolled ? 'shadow-2xl backdrop-blur-md bg-gray-900/98' : 'shadow-lg'
    }`} style={{height: isScrolled ? '200px' : '180px'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
        <div className="flex items-center justify-between h-full relative">
          {/* Logo Section */}
          <div className="flex-shrink-0 relative -my-8">
            <img 
              src={butterflyLogo} 
              alt="Butterfly Providers Logo" 
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-36 sm:h-40 md:h-44' : 'h-32 sm:h-36 md:h-40'
              }`}
            />
          </div>

          {/* Content Grid - Positioned to the right of logo */}
          <div className="flex-1 ml-4 md:ml-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm relative z-10">
            {/* Hours of Operation */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Hours</h4>
              <ul className="space-y-1 text-xs">
                <li className="text-gray-400">
                  Monday - Friday
                </li>
                <li className="text-gray-400">
                  8:00 AM - 5:00 PM
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Policies</h4>
              <ul className="space-y-1 text-xs">
                {policies.slice(0, 4).map((policy, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {policy}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Company Info */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Get In Touch</h4>
              <ul className="space-y-1 text-xs">
                <li className="text-gray-400">
                  <Phone className="inline mr-2" size={12} />
                  <a href="tel:602-830-0966" className="hover:text-white transition-colors">
                    602-830-0966
                  </a>
                </li>
                <li className="text-gray-400">
                  <Mail className="inline mr-2" size={12} />
                  <a href="mailto:info@butterflyproviders.com" className="hover:text-white transition-colors">
                    info@butterflyproviders.com
                  </a>
                </li>
              </ul>
              <div className="mt-3">
                <p className="text-gray-400 text-xs leading-relaxed mb-2">
                  10720 West Indian School Rd.<br />Phoenix, AZ 85037
                </p>
                <div className="flex items-center space-x-2">
                  <Shield className="text-emerald-500" size={14} />
                  <span className="text-xs text-gray-400">Licensed & Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Absolutely positioned at bottom */}
        <div className="absolute bottom-1 left-4 right-4">
          <p className="text-gray-400 text-xs text-center">
            © 2024 Butterfly Providers. All rights reserved. Licensed Non-Medical Home Care Provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
