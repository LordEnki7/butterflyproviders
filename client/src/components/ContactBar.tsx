import { Phone, Mail, MessageSquare } from 'lucide-react';

export default function ContactBar() {
  return (
    <div className="bg-emerald-600 text-white py-2 fixed top-0 left-0 right-0 z-[60]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <a 
            href="sms:602-830-0966" 
            className="flex items-center gap-2 hover:text-emerald-200 transition-colors text-sm md:text-base"
            data-testid="link-text"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Text Us</span>
            <span className="sm:hidden">Text</span>
          </a>
          
          <span className="text-emerald-300">|</span>
          
          <a 
            href="tel:602-830-0966" 
            className="flex items-center gap-2 hover:text-emerald-200 transition-colors text-sm md:text-base"
            data-testid="link-call"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Call 602-830-0966</span>
            <span className="sm:hidden">Call</span>
          </a>
          
          <span className="text-emerald-300">|</span>
          
          <a 
            href="mailto:info@butterflyproviders.com" 
            className="flex items-center gap-2 hover:text-emerald-200 transition-colors text-sm md:text-base"
            data-testid="link-email"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email Us</span>
            <span className="sm:hidden">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
