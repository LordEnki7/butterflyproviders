import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import butterflyLogo from "@assets/IMG_0338_1753896135644.png";

export default function MainNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navigationItems = [
    { href: '/about-us', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/join-our-team', label: 'Join Our Team' }
  ];

  return (
    <header className={`bg-white shadow-sm border-b relative overflow-hidden transition-all duration-300 z-50 fixed top-0 left-0 right-0 ${
      isScrolled ? 'shadow-md backdrop-blur-sm' : 'shadow-sm'
    }`} style={{height: '120px'}}>
      <div className="container mx-auto px-4 py-0 relative">
        <div className="flex justify-between items-center relative -my-16">
          <Link href="/" className="flex-shrink-0 relative z-10 group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <img 
                src={butterflyLogo} 
                alt="Butterfly Providers Logo" 
                className="w-auto transition-all duration-300"
                style={{ height: '240px' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`transition-all duration-200 hover:scale-105 group ${
                      isActive ? "bg-emerald-600 hover:bg-emerald-700 shadow-md" : "hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <div className="flex space-x-2">
              <Link href="/login">
                <Button variant="outline" className="transition-all duration-200 hover:scale-105 hover:border-emerald-600 hover:text-emerald-600">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs">
                Login
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative transition-all duration-300 hover:scale-110 hover:bg-emerald-50 hover:border-emerald-300"
            >
              <div className="relative w-5 h-5">
                <Menu className={`h-4 w-4 absolute transition-all duration-300 ${
                  isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`h-4 w-4 absolute transition-all duration-300 ${
                  isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="px-4 py-6 space-y-3">
            {navigationItems.map((item, index) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <div 
                    className={`block p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                      isActive ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-emerald-50 text-gray-700 hover:text-emerald-700'
                    }`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      opacity: 0,
                      animation: `slideInLeft 0.4s ease-out forwards ${index * 100}ms`
                    }}
                  >
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-gray-200">
              <Link href="/register">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}