import { Phone, Mail, Shield } from 'lucide-react';
import butterflyLogo from "@assets/IMG_0338_1753896135644.png";

const policies = [
  "Privacy Policy",
  "Terms & Conditions", 
  "Service Agreement",
  "Cancellation Policy",
  "HIPAA Compliance",
  "Code of Ethics"
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden" style={{height: '136px'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
        <div className="flex items-center justify-between h-full relative">
          {/* Logo Section */}
          <div className="flex-shrink-0 relative -my-16">
            <img 
              src={butterflyLogo} 
              alt="Butterfly Providers Logo" 
              className="h-56 sm:h-64 md:h-72 w-auto"
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
                <li className="text-emerald-400 font-semibold">
                  24/7 Care Available
                </li>
                <li className="text-gray-400">
                  Upon Request
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
              <h4 className="text-sm font-semibold mb-2">Contact</h4>
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
                  2455 W Chandler Blvd, Suite 120<br />Chandler, AZ 85224
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
