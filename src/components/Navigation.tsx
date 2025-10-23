import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/plans', label: 'Investment Plans' },
    { path: '/team', label: 'Team' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/query-form');
    } else {
      navigate('/auth');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-background/95 backdrop-blur sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              InvestEd capital
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-primary font-semibold bg-secondary'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link
                to="/my-courses"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/my-courses')
                    ? 'text-primary font-semibold bg-secondary'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                My Courses
              </Link>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="outline" onClick={() => navigate('/query-form')}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut size={16} />
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-md ${
                  isActive(item.path)
                    ? 'text-primary font-semibold bg-secondary'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link
                to="/my-courses"
                className={`block px-4 py-2 rounded-md ${
                  isActive('/my-courses')
                    ? 'text-primary font-semibold bg-secondary'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                My Courses
              </Link>
            )}
            <div className="px-4 pt-2 space-y-2">
              {isAuthenticated ? (
                <>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      navigate('/query-form');
                      setIsOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent text-white"
                  onClick={() => {
                    handleGetStarted();
                    setIsOpen(false);
                  }}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
