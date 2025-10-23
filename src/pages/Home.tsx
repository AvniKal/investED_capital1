import { ArrowRight, BookOpen, TrendingUp, Users, Award, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-investment.jpg';

const Home = () => {
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
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Investment growth visualization" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Learn. Invest. <span className="text-accent">Grow.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Master the art of investing with expert-led courses and personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8" onClick={handleGetStarted}>
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'} <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              <Link to="/plans">View Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Audience Highlights */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Designed For Every Investor
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Students',
                desc: 'Build foundational knowledge with gamified learning',
                icon: BookOpen,
              },
              {
                title: 'Professionals',
                desc: 'Advance your career with practical finance skills',
                icon: Award,
              },
              {
                title: 'Investors',
                desc: 'Optimize your portfolio with expert strategies',
                icon: TrendingUp,
              },
              {
                title: 'Business Owners',
                desc: 'Master corporate finance and strategic planning',
                icon: Users,
              },
            ].map((item, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                    <item.icon className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition - Three Pillars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Your Path to Financial Success
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <BookOpen className="text-white" size={36} />
                </div>
                <CardTitle className="text-2xl">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access premium courses taught by industry experts with real-world experience
                </p>
                <Button asChild variant="outline">
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                  <TrendingUp className="text-white" size={36} />
                </div>
                <CardTitle className="text-2xl">Advisory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get personalized investment strategies tailored to your goals and risk profile
                </p>
                <Button asChild variant="outline">
                  <Link to="/plans">View Plans</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Users className="text-white" size={36} />
                </div>
                <CardTitle className="text-2xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with fellow investors in forums, events, and live discussions
                </p>
                <Button asChild variant="outline">
                  <Link to="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">10,000+</div>
              <div className="text-xl">Trusted Learners</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">50+</div>
              <div className="text-xl">Expert Instructors</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">95%</div>
              <div className="text-xl">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose InvestEd capital?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Shield className="text-accent mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-muted-foreground">
                Industry-leading security with SSL encryption and data protection
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="text-accent mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Certified Experts</h3>
              <p className="text-muted-foreground">
                Learn from CFA and CFP certified professionals
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="text-accent mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Get help whenever you need it with our dedicated support team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who started their journey with us
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8" onClick={handleGetStarted}>
            {isAuthenticated ? 'Continue Learning' : 'Start Learning Today'} <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
