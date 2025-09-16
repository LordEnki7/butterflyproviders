import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, User, Calendar, CreditCard, Users, Settings, X, ChevronRight, Phone, Mail } from 'lucide-react';
import butterflyLogo from "@assets/IMG_0338_1753896135644.png";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      // Remove JWT token from localStorage
      localStorage.removeItem('auth_token');
      
      // Optional: Call server logout endpoint
      await fetch('/api/logout', { method: 'POST' });
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      // Even if server call fails, still remove token and redirect
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
  };

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
    { href: '/', label: 'Home', icon: User },
    { href: '/scheduling', label: 'Scheduling', icon: Calendar },
    { href: '/billing', label: 'Billing', icon: CreditCard },
  ];

  if (!isAuthenticated) {
    return (
      <header className={`bg-white shadow-sm border-b relative overflow-hidden transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`} style={{height: '136px'}}>
        <div className="container mx-auto px-4 py-0 relative">
          <div className="flex justify-between items-center relative -my-16">
            <Link href="/" className="flex-shrink-0 relative z-10 group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={butterflyLogo} 
                  alt="Butterfly Providers Logo" 
                  className={`w-auto transition-all duration-300 ${
                    isScrolled ? 'h-48 sm:h-56 md:h-64' : 'h-56 sm:h-64 md:h-72'
                  }`}
                />
              </div>
            </Link>
            <div className="flex space-x-2 md:space-x-4">
              <Link href="/login">
                <Button variant="outline" className="text-sm md:text-base px-3 md:px-4 transition-all duration-200 hover:scale-105 hover:border-emerald-600 hover:text-emerald-600">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm md:text-base px-3 md:px-4 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`bg-white shadow-sm border-b relative overflow-hidden transition-all duration-300 ${
      isScrolled ? 'shadow-md backdrop-blur-sm' : 'shadow-sm'
    }`} style={{height: '136px'}}>
      <div className="container mx-auto px-4 py-0 relative">
        <div className="flex justify-between items-center relative -my-16">
          <Link href="/" className="flex-shrink-0 relative z-10 group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <img 
                src={butterflyLogo} 
                alt="Butterfly Providers Logo" 
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-48 sm:h-56 md:h-64' : 'h-56 sm:h-64 md:h-72'
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                      isActive ? "bg-emerald-600 hover:bg-emerald-700 shadow-md" : "hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            
            {/* User Status */}
            <div className="flex items-center space-x-3 px-3 py-2 bg-emerald-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Logged in"></div>
              <span className="text-sm font-medium text-emerald-800">
                {(user as any)?.firstName || 'User'}
              </span>
            </div>
            
            {/* Logout Button */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2 transition-all duration-200 hover:scale-105 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />
              <span>Logout</span>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="outline" 
                size="icon"
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
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-80 p-0 bg-gradient-to-br from-emerald-50 via-white to-purple-50 border-l-4 border-emerald-200"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Navigation</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 transition-all duration-200"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <p className="font-medium text-emerald-100">Welcome, {(user as any)?.firstName || 'User'}!</p>
                    <p className="text-sm text-emerald-200">{(user as any)?.email}</p>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 p-6 space-y-2 overflow-y-auto">
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <div 
                          className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 animate-slide-in-left ${
                            isActive ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg transform-gpu' : 'hover:bg-white hover:shadow-md'
                          }`}
                          style={{ 
                            animationDelay: `${index * 150}ms`,
                            opacity: 0,
                            animation: `slideInLeft 0.4s ease-out forwards ${index * 150}ms`
                          }}
                        >
                          <div className={`flex items-center space-x-4 p-4 transition-all duration-200 ${
                            isActive ? 'text-white' : 'text-gray-700 group-hover:text-emerald-700'
                          }`}>
                            <div className={`p-2 rounded-lg transition-all duration-200 group-hover:rotate-6 ${
                              isActive ? 'bg-white/20' : 'bg-emerald-100 group-hover:bg-emerald-200'
                            }`}>
                              <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? 'animate-pulse-slow' : 'group-hover:scale-110'}`} />
                            </div>
                            <span className="font-medium flex-1">{item.label}</span>
                            <ChevronRight className={`h-4 w-4 transition-all duration-200 ${
                              isActive ? 'text-white/80 animate-pulse' : 'text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1'
                            }`} />
                          </div>
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 animate-pulse-slow"></div>
                          )}
                          <div className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}></div>
                        </div>
                      </Link>
                    );
                  })}
                  
                  {/* Quick Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 mb-3 px-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <a 
                        href="tel:602-830-0966"
                        className="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg flex flex-col items-center space-y-1 transition-all duration-200 hover:scale-105"
                      >
                        <Phone className="h-5 w-5 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">Call Now</span>
                      </a>
                      <button 
                        onClick={() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                        }}
                        className="bg-purple-50 hover:bg-purple-100 p-3 rounded-lg flex flex-col items-center space-y-1 transition-all duration-200 hover:scale-105"
                      >
                        <Mail className="h-5 w-5 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700">Contact</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-start space-x-3 py-3 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 hover:scale-105"
                  >
                    <div className="p-1.5 bg-red-100 rounded-lg">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Logout</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}