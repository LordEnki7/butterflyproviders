import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import ButterflyLogo from './ButterflyLogo';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <ButterflyLogo size="md" />
            <div>
              <h1 className="text-2xl font-bold text-emerald-600">Butterfly Providers</h1>
              <p className="text-sm text-gray-600">Non-Medical Home Care</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Contact
            </a>
            <div className="flex items-center space-x-4">
              <a href="tel:602-830-0966" className="text-emerald-600 font-semibold flex items-center gap-2 hover:text-emerald-700 transition-colors">
                <Phone size={16} />
                602-830-0966
              </a>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {(user as any)?.firstName || 'Client'}</span>
                  <Button 
                    onClick={() => window.location.href = '/api/logout'}
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/signup">
                    <Button 
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => window.location.href = '/api/login'}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Client Login
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Contact
              </a>
              <a href="tel:602-830-0966" className="text-emerald-600 font-semibold flex items-center gap-2">
                <Phone size={16} />
                602-830-0966
              </a>
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700">Welcome, {(user as any)?.firstName || 'Client'}</span>
                  <Button 
                    onClick={() => window.location.href = '/api/logout'}
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white w-fit"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => window.location.href = '/api/login'}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 w-fit"
                >
                  Client Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
