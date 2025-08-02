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
      <header className="bg-white shadow-sm border-b py-0">
        <div className="container mx-auto px-1">
          <div className="flex justify-between items-center h-auto">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <img 
                  src={butterflyLogo} 
                  alt="Butterfly Providers Logo" 
                  className="h-72 w-auto"
                />
              </div>
            </Link>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b py-0">
      <div className="container mx-auto px-1">
        <div className="flex justify-between items-center h-auto">
          <Link href="/">
            <div className="flex items-center space-x-3">
              <img 
                src={butterflyLogo} 
                alt="Butterfly Providers Logo" 
                className="h-72 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive ? "bg-emerald-600 hover:bg-emerald-700" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="pb-4 border-b">
                    <p className="font-medium">Welcome, {user?.firstName || 'User'}!</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.href;
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            isActive ? "bg-emerald-600 hover:bg-emerald-700" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}