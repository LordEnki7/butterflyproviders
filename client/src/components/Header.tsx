import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, User, Calendar, CreditCard, Users, Settings } from 'lucide-react';
import butterflyLogo from "@assets/IMG_0338_1753896135644.png";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const navigationItems = [
    { href: '/', label: 'Home', icon: User },
    { href: '/scheduling', label: 'Scheduling', icon: Calendar },
    { href: '/billing', label: 'Billing', icon: CreditCard },
    { href: '/caregivers', label: 'Caregivers', icon: Users },
    { href: '/admin', label: 'Admin', icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <header className="bg-gradient-to-r from-emerald-50 to-purple-50 shadow-lg border-b-2 border-emerald-200">
        <div className="container mx-auto px-4 py-1">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="bg-white rounded-lg p-1 shadow-md hover:shadow-lg transition-shadow duration-200">
                <img 
                  src={butterflyLogo} 
                  alt="Butterfly Providers Logo" 
                  className="h-72 w-auto"
                />
              </div>
            </Link>
            <div className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-md">
              <Link href="/login">
                <Button variant="outline" className="rounded-full border-emerald-300 hover:bg-emerald-50">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full shadow-md">
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
    <header className="bg-gradient-to-r from-emerald-50 to-purple-50 shadow-lg border-b-2 border-emerald-200">
      <div className="container mx-auto px-4 py-1">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <div className="bg-white rounded-lg p-1 shadow-md hover:shadow-lg transition-shadow duration-200">
              <img 
                src={butterflyLogo} 
                alt="Butterfly Providers Logo" 
                className="h-72 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-white rounded-full px-4 py-2 shadow-md space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 rounded-full transition-all duration-200 ${
                      isActive 
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md" 
                        : "hover:bg-emerald-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2 rounded-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md border-emerald-200 hover:bg-emerald-50">
                <Menu className="h-5 w-5 text-emerald-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-gradient-to-b from-emerald-50 to-purple-50">
              <div className="flex flex-col space-y-3 mt-8">
                <div className="text-lg font-semibold text-emerald-800 mb-4 text-center">
                  Navigation Menu
                </div>
                <div className="pb-4 border-b border-emerald-200 bg-white rounded-lg p-3 shadow-sm">
                  <p className="font-medium text-emerald-800">Welcome, {user?.firstName || 'User'}!</p>
                  <p className="text-sm text-emerald-600">{user?.email}</p>
                </div>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start space-x-3 rounded-full py-3 transition-all duration-200 ${
                          isActive 
                            ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md" 
                            : "hover:bg-white hover:shadow-sm"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
                <div className="h-px bg-gray-300 my-2"></div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full justify-start space-x-3 rounded-full py-3 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}