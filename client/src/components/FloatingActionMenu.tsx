import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Phone, Mail, X } from 'lucide-react';

const actionItems = [
  {
    icon: Phone,
    label: 'Call Now',
    href: 'tel:602-830-0966',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    icon: Mail,
    label: 'Email Us',
    href: 'mailto:info@butterflyproviders.com',
    color: 'bg-purple-500 hover:bg-purple-600'
  }
];

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: typeof actionItems[0]) => {
    window.open(item.href, item.href.startsWith('tel:') || item.href.startsWith('mailto:') ? '_self' : '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      <div className={`flex flex-col-reverse space-y-reverse space-y-3 mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actionItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="animate-bounce-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Button
                onClick={() => handleItemClick(item)}
                className={`${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 h-12 px-4 rounded-full flex items-center space-x-2 group`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              </Button>
            </div>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45 scale-110' 
            : 'bg-emerald-600 hover:bg-emerald-700 animate-pulse-slow'
        }`}
        size="icon"
      >
        <div className="relative w-6 h-6">
          <Plus className={`h-6 w-6 absolute transition-all duration-300 ${
            isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`} />
          <X className={`h-6 w-6 absolute transition-all duration-300 ${
            isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
          }`} />
        </div>
      </Button>
    </div>
  );
}