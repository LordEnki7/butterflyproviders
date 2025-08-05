import { Phone, Mail, Clock, Shield, Facebook, Instagram, Linkedin } from 'lucide-react';
import butterflyLogo from "@assets/IMG_0338_1753896135644.png";

const services = [
  "Personal Care",
  "Companionship", 
  "Meal Preparation",
  "Transportation",
  "Dementia Support",
  "Respite Care"
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
            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Services</h4>
              <ul className="space-y-1 text-xs">
                {services.slice(0, 4).map((service, index) => (
                  <li key={index}>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
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
                <li className="text-gray-400">
                  <Clock className="inline mr-2" size={12} />
                  24/7 Care Available
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="text-sm font-semibold mb-2">About</h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">
                Professional non-medical home care services in Phoenix, AZ.
              </p>
              <div className="flex space-x-2">
                <a href="#" className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Facebook size={12} />
                </a>
                <a href="#" className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Instagram size={12} />
                </a>
                <a href="#" className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Linkedin size={12} />
                </a>
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
