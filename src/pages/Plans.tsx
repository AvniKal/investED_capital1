import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Plans = () => {
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

  const plans = [
    {
      name: '1 Year Plan',
      price: '₹50K - ₹5L',
      period: 'Capital Range',
      description: 'Short-term investment with flexible capital options',
      features: [
        'Monthly returns: 3-5% on invested capital',
        'Yearly returns: 36-60% on invested capital',
        'Profit sharing: 70% yours, 30% ours',
        'Capital locked for 1 year',
        'Monthly interest credited',
        'Capital withdrawal after 1 year',
        'Minimum investment: ₹50,000',
        'Maximum investment: ₹5,00,000',
      ],
      highlighted: false,
    },
    {
      name: '3 Year Plan',
      price: '₹5L - ₹10L',
      period: 'Capital Range',
      description: 'Medium-term growth with better profit sharing',
      features: [
        'Monthly returns: 3-5% on invested capital',
        'Yearly returns: 36-60% on invested capital',
        'Profit sharing: 80% yours, 20% ours',
        'Capital locked for 3 years',
        'Monthly interest credited',
        'Capital withdrawal after 3 years',
        'Minimum investment: ₹5,00,000',
        'Maximum investment: ₹10,00,000',
      ],
      highlighted: true,
    },
    {
      name: '5 Year Plan',
      price: '₹10L - ₹1Cr',
      period: 'Capital Range',
      description: 'Long-term wealth building with maximum returns',
      features: [
        'Monthly returns: 3-5% on invested capital',
        'Yearly returns: 36-60% on invested capital',
        'Profit sharing: 90% yours, 10% ours',
        'Capital locked for 5 years',
        'Monthly interest credited',
        'Capital withdrawal after 5 years',
        'Minimum investment: ₹10,00,000',
        'Maximum investment: ₹1,00,00,000',
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Investment Plans
            </h1>
            <p className="text-xl">
              Choose the plan that matches your investment goals. Earn 3-5% monthly returns with flexible profit sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative flex flex-col ${
                  plan.highlighted 
                    ? 'border-accent shadow-2xl scale-105 z-10' 
                    : 'hover:shadow-xl'
                } transition-all`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-accent text-white px-6 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-4">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className={`mr-3 mt-1 flex-shrink-0 ${plan.highlighted ? 'text-accent' : 'text-primary'}`} size={20} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-accent hover:bg-accent/90 text-white' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                    size="lg"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              All Plans Include
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Monthly Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn consistent 3-5% monthly returns on your invested capital, credited directly to your account.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Capital Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your capital is secure and withdrawable after the lock-in period ends.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Flexible Profit Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose from 70%, 80%, or 90% profit share based on your investment duration.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Transparent Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Clear terms with no hidden fees. Track your returns and investment performance anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I withdraw my capital before the lock-in period?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No, capital is locked for the entire investment period (1, 3, or 5 years). However, monthly interest earnings are credited to your account regularly.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How is the profit sharing calculated?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    For example, if you earn ₹1,000/month on a 1-year plan (70:30), you receive ₹700 and we retain ₹300. Longer plans offer better profit sharing ratios.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are the returns guaranteed?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Returns range from 3-5% monthly based on market performance and your capital amount. Specific returns depend on the invested capital and market conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;
