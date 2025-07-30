import ButterflyLogo from './ButterflyLogo';
import { Phone, Mail, Clock, Shield, Facebook, Instagram, Linkedin } from 'lucide-react';

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
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <ButterflyLogo size="sm" />
              <div>
                <h3 className="text-xl font-bold text-white">Butterfly Providers</h3>
                <p className="text-gray-400 text-sm">Non-Medical Home Care</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Providing compassionate, professional non-medical home care services to help you maintain independence and dignity in your own home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
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
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <Phone className="inline mr-3" size={16} />
                <a href="tel:602-830-0966" className="hover:text-white transition-colors">
                  602-830-0966
                </a>
              </li>
              <li className="text-gray-400">
                <Mail className="inline mr-3" size={16} />
                <a href="mailto:info@butterflyproviders.com" className="hover:text-white transition-colors">
                  info@butterflyproviders.com
                </a>
              </li>
              <li className="text-gray-400">
                <Clock className="inline mr-3" size={16} />
                24/7 Care Available
              </li>
              <li className="text-gray-400">
                <Shield className="inline mr-3" size={16} />
                Licensed & Insured
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Butterfly Providers. All rights reserved. Licensed Non-Medical Home Care Provider.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
