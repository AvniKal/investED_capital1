import { Target, Heart, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const About = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/query-form');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About InvestEd capital
            </h1>
            <p className="text-xl leading-relaxed">
              We're on a mission to democratize financial education and empower individuals 
              to make informed investment decisions for a secure financial future.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                At InvestEd Capital, we are a new-age investment management firm driven by data, discipline, and diversification. Founded by a team of 12 certified professionals holding NISM Series 8, NISM Series 15, and SEBI Investor Awareness certifications, our mission is to make smart investing accessible, effective, and empowering for everyone.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We specialize in multi-asset fund management, offering diversified exposure across crypto, forex, Indian and U.S. indices, and other high-potential markets. Our investment approach combines technical precision with fundamental insight, ensuring every decision is backed by rigorous research, strategy, and risk management.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Beyond fund management, we’re passionate about empowering investors through education. InvestEd Capital Academy provides industry-relevant courses in Technical Analysis, Fundamental Analysis, Smart Money Concepts (SMC), and Inner Circle Trading (ICT) — designed to help individuals trade and invest with confidence, clarity, and consistency.

              </p>
              <p className="text-lg leading-relaxed">
                At InvestEd Capital, we don’t just manage capital — we grow knowledge, build trust, and create wealth together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Target className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">Mission-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're committed to making financial literacy accessible to everyone
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Heart className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide honest, transparent guidance with your best interests in mind
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Users className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in the power of learning together and supporting each other
                </p>
              </CardContent>
            </Card>

            <Card className="text-4 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for excellence in every course, resource, and interaction
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Who We Serve
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Students & Beginners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Whether you're in school or just starting your financial journey, we provide 
                    the foundational knowledge you need to succeed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Busy Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our flexible courses fit into your schedule, helping you build valuable skills 
                    without disrupting your career.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Self-Directed Investors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Take control of your portfolio with advanced strategies and expert insights 
                    to maximize your returns.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Entrepreneurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Master corporate finance and investment strategies to grow your business 
                    and personal wealth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community and take the first step toward financial freedom
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold" onClick={handleGetStarted}>
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
