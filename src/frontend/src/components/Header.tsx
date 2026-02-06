import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserRole } from '../hooks/useQueries';
import { Button } from './ui/button';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export default function Header() {
  const { identity } = useInternetIdentity();
  const { data: userRole } = useGetCallerUserRole();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = userRole === 'admin';
  const isAuthenticated = !!identity;

  const handleAdminClick = () => {
    setMobileMenuOpen(false);
    navigate({ to: '/admin' });
  };

  const handleStoreClick = () => {
    setMobileMenuOpen(false);
    navigate({ to: '/' });
  };

  const handleLoginClick = () => {
    setMobileMenuOpen(false);
    navigate({ to: '/' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/assets/generated/store-logo.dim_512x256.png"
            alt="Store Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          <Link to="/">
            <Button variant="outline" size="sm">
              <User className="mr-2 h-4 w-4" />
              {isAuthenticated ? 'Account' : 'Sign In'}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav className="flex flex-col space-y-4 mt-8">
              <button
                onClick={handleStoreClick}
                className="text-left text-sm font-medium transition-colors hover:text-primary"
              >
                Products
              </button>
              {isAdmin && (
                <button
                  onClick={handleAdminClick}
                  className="text-left text-sm font-medium transition-colors hover:text-primary"
                >
                  Admin
                </button>
              )}
              <button
                onClick={handleLoginClick}
                className="text-left text-sm font-medium transition-colors hover:text-primary"
              >
                {isAuthenticated ? 'Account' : 'Sign In'}
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
