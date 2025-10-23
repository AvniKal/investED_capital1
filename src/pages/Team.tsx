import { Mail, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import teamImage from '@/assets/team-hero.jpg';

const Team = () => {
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

  const teamMembers = [
    {
      name: 'Ronit Jain',
      role: 'Senior Global Market Analyst',
      credentials: 'CFO,MD,NISM 15, NISM 8',
      bio: '5+ years of experience in the Indian market with specialized expertise in crypto and forex trading. Co-founder of Jurix AI Pvt Ltd with 2 years of prop firm experience.',
      specialties: 'Indian Markets, Crypto Trading, Forex Trading, Proprietary Trading',
    },
    {
      name: 'Aditya Kumar',
      role: 'Crypto and derivatives analyst',
      credentials: ' NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Gold, Nifty, BankNifty, BTC, USDJPY',
    },
    {
      name: 'Adwit Aum',
      role: 'Portfolio Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Portfolio, Stocks(Indian),Money Management',
    },
    {
      name: 'Avni Kalawatia',
      role: 'Capital Market Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Indian Stocks, BTC,ETH',
    },
    {
      name: 'Disha Goel',
      role: 'Portfolio Analyst',
      credentials: ' NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Indian Stocks, Crude Oil, Silver',
    },
    {
      name: 'Garima Agarwal',
      role: 'Equity Market Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Indian Stocks, Coal, Natural Gas',
    },
     {
      name: 'Pari Gautam',
      role: 'Portfolio Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'IPO Analysis',
    },
    {
      name: 'Nipun Goyal',
      role: 'Forex Market Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Forex, EUR/USD, BTC, ETH',
    },
    {
      name: 'Sumit Rathore',
      role: 'Crypto Market Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Gold, Silver, Options, Commodity',
    },
    {
      name: 'Sarthak Gaware',
      role: 'Commodity Market Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'BTC, Indian Stocks, Gold',
    },
    {
      name: 'Silvy',
      role: 'Commodity Market Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Crude Oil, Natural Gas, Silver',
    },
    {
      name: 'Abhinav Pandey',
      role: 'Derivatives Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'Options Indian Market, Portfolio Management',
    },
    {
      name: 'Vedant Pasari',
      role: 'Algo Trader',
      credentials: 'NISM 15, NISM 8,
      bio: 'years of experience and expertise',
      specialties: 'Algorithmic Trading',
    },
     {
      name: 'Ayushman Sinha',
      role: 'Economic Analyst',
      credentials: 'NISM 15, NISM 8',
      bio: 'years of experience and expertise',
      specialties: 'News and economics',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={teamImage} 
            alt="Our team of expert advisors" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Experts</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn from certified professionals with decades of combined experience in finance and investing
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-32 h-32 bg-gradient-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-accent font-semibold">{member.credentials}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-1">Specialties:</p>
                    <p className="text-sm text-muted-foreground">{member.specialties}</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                      <Mail size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                      <Linkedin size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Work With Our Team?
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Certified Professionals</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every advisor holds professional certifications (CFA, CFP, or equivalent) ensuring you receive expert guidance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Real-World Experience</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team has worked at top financial institutions and managed millions in assets.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Passionate Educators</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We don't just know finance—we love teaching it. Your success is our mission.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Diverse Expertise</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From stocks to real estate to crypto, we cover every major asset class and investment strategy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Learn from the Best?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our expert team and accelerate your financial success
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8" onClick={handleGetStarted}>
            {isAuthenticated ? 'Continue Your Journey' : 'Get Started Today'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Team;
