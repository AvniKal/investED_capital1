import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, PlayCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface Lecture {
  id: string;
  title: string;
  description: string;
  duration: string;
  is_demo: boolean;
  order_index: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  instructor: string;
  enrolled_at: string;
}

const MyCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [lectures, setLectures] = useState<Record<string, Lecture[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select('course_id, enrolled_at')
        .eq('user_id', user.id)
        .eq('payment_status', 'completed');

      if (enrollError) {
        toast({
          title: 'Error',
          description: 'Failed to fetch your courses',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (!enrollments || enrollments.length === 0) {
        setLoading(false);
        return;
      }

      const courseIds = enrollments.map(e => e.course_id);
      
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds);

      if (coursesError) {
        toast({
          title: 'Error',
          description: 'Failed to fetch course details',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      const enrichedCourses = coursesData.map(course => {
        const enrollment = enrollments.find(e => e.course_id === course.id);
        return {
          ...course,
          enrolled_at: enrollment?.enrolled_at || '',
        };
      });

      setCourses(enrichedCourses);

      // Fetch lectures for all courses
      const { data: lecturesData } = await supabase
        .from('lectures')
        .select('*')
        .in('course_id', courseIds)
        .order('order_index');

      if (lecturesData) {
        const lecturesBy课程 = lecturesData.reduce((acc, lecture) => {
          if (!acc[lecture.course_id]) {
            acc[lecture.course_id] = [];
          }
          acc[lecture.course_id].push(lecture);
          return acc;
        }, {} as Record<string, Lecture[]>);
        
        setLectures(lecturesBy课程);
      }

      setLoading(false);
    };

    fetchEnrolledCourses();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-4">My Courses</h1>
          <p className="text-muted-foreground mb-8">You haven't enrolled in any courses yet.</p>
          <Button onClick={() => navigate('/courses')}>
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>
        
        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                    <CardDescription>
                      by {course.instructor} • Enrolled {new Date(course.enrolled_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge>{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{course.description}</p>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="lectures">
                    <AccordionTrigger className="text-lg font-semibold">
                      Course Content ({lectures[course.id]?.length || 0} lectures)
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {lectures[course.id]?.map((lecture, index) => (
                          <div 
                            key={lecture.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {lecture.is_demo ? (
                                <PlayCircle className="h-5 w-5 text-primary" />
                              ) : (
                                <PlayCircle className="h-5 w-5 text-muted-foreground" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{lecture.title}</p>
                                  {lecture.is_demo && (
                                    <Badge variant="secondary" className="text-xs">FREE</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{lecture.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                              <Button size="sm" variant={lecture.is_demo ? "default" : "outline"}>
                                Watch
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
