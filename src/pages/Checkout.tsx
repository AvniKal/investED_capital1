import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
  level: string;
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        navigate('/courses');
        return;
      }

      const { data, error } = await supabase
        .from('courses')
        .select('*')
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

  const handleProceedToPayment = async () => {
    if (!course) return;

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

    // Create enrollment with pending status
    const { error } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: course.id,
        payment_status: 'pending',
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: 'Already Enrolled',
          description: 'You are already enrolled in this course',
        });
        navigate('/my-courses');
        return;
      }
      toast({
        title: 'Error',
        description: 'Failed to process enrollment',
        variant: 'destructive',
      });
      return;
    }

    navigate(`/payment?courseId=${course.id}`);
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
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.level} Level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{course.description}</p>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-2xl text-primary">₹{course.price.toLocaleString()}</span>
              </div>
            </div>

            <Button 
              onClick={handleProceedToPayment}
              className="w-full"
              size="lg"
            >
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
