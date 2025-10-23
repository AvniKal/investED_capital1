import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  price: number;
}

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        navigate('/courses');
        return;
      }

      const { data, error } = await supabase
        .from('courses')
        .select('id, title, price')
        .eq('id', courseId)
        .single();

      if (error || !data) {
        toast({
          title: 'Error',
          description: 'Course not found',
          variant: 'destructive',
        });
        navigate('/courses');
        return;
      }

      setCourse(data);
      setLoading(false);
    };

    fetchCourse();
  }, [courseId, navigate, toast]);

  const handlePayment = async () => {
    if (!course) return;
    
    setProcessing(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to continue',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update enrollment status to completed
    const { error } = await supabase
      .from('enrollments')
      .update({ payment_status: 'completed' })
      .eq('user_id', user.id)
      .eq('course_id', course.id);

    if (error) {
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment',
        variant: 'destructive',
      });
      setProcessing(false);
      return;
    }

    toast({
      title: 'Payment Successful!',
      description: 'You are now enrolled in the course',
    });

    navigate('/my-courses');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Payment</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Complete Your Payment
            </CardTitle>
            <CardDescription>Secure payment for {course.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Course:</span>
                <span>{course.title}</span>
              </div>
              <div className="flex justify-between items-center mt-2 text-lg font-bold">
                <span>Amount to Pay:</span>
                <span className="text-primary">₹{course.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="border p-4 rounded-lg bg-card">
              <p className="text-sm text-muted-foreground mb-4">
                This is a demo payment. In production, this would integrate with a payment gateway.
              </p>
              <p className="text-xs text-muted-foreground">
                Click "Complete Payment" to simulate a successful transaction.
              </p>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={processing}
              className="w-full"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                'Complete Payment'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
