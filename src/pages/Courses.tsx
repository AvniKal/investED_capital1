import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, Star, Users, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import coursesImage from '@/assets/courses-hero.jpg';

interface Lecture {
  id: string;
  title: string;
  description: string;
  duration: string;
  is_demo: boolean;
}

interface Course {
  id: string;
  title: string;
  level: string;
  price: number;
  duration: string;
  students: number;
  rating: number;
  instructor: string;
  description: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [courses, setCourses] = useState<Course[]>([]);
  const [lectures, setLectures] = useState<Record<string, Lecture[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data: coursesData, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load courses',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      setCourses(coursesData || []);

      // Fetch demo lectures for all courses
      const { data: lecturesData } = await supabase
        .from('lectures')
        .select('*')
        .eq('is_demo', true);

      if (lecturesData) {
        const lecturesByCourse = lecturesData.reduce((acc, lecture) => {
          if (!acc[lecture.course_id]) {
            acc[lecture.course_id] = [];
          }
          acc[lecture.course_id].push(lecture);
          return acc;
        }, {} as Record<string, Lecture[]>);
        
        setLectures(lecturesByCourse);
      }

      setLoading(false);
    };

    fetchCourses();
  }, [toast]);

  const handleEnroll = async (courseId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to enroll in courses',
      });
      navigate('/auth');
      return;
    }

    navigate(`/checkout?courseId=${courseId}`);
  };

  const staticCourses: Course[] = [
    {
      id: 'temp-1',
      title: 'Stock and Market Fundamentals',
      level: 'Beginner',
      price: 2000,
      duration: '4 weeks',
      students: 3240,
      rating: 4.9,
      instructor: 'Expert Trading Team',
      description: 'Master the fundamentals of stock markets, trading basics, and build a strong foundation for your trading journey.',
    },
    {
      id: 'temp-2',
      title: 'Technical and Traditional Analysis',
      level: 'Intermediate',
      price: 3000,
      duration: '6 weeks',
      students: 2850,
      rating: 4.8,
      instructor: 'Expert Trading Team',
      description: 'Learn chart patterns, indicators, candlestick analysis, and traditional technical analysis methods.',
    },
    {
      id: 'temp-3',
      title: 'SMC Core Course',
      level: 'Advanced',
      price: 5000,
      duration: '8 weeks',
      students: 1920,
      rating: 4.9,
      instructor: 'Expert Trading Team',
      description: 'Smart Money Concepts - Understand institutional trading, order blocks, and market structure.',
    },
    {
      id: 'temp-4',
      title: 'Advanced ICT Course',
      level: 'Advanced',
      price: 8000,
      duration: '10 weeks',
      students: 1450,
      rating: 5.0,
      instructor: 'Expert Trading Team',
      description: 'Inner Circle Trader methodology - Advanced price action, liquidity concepts, and institutional strategies.',
    },
  ];

  const comboCourses = [
    {
      title: 'Complete Trading Bundle',
      courses: ['All 4 Courses'],
      originalPrice: 18000,
      price: '₹15,000',
      priceValue: 15000,
      savings: 3000,
      description: 'Get all courses at a discounted price. Perfect for serious traders.',
      students: 980,
      rating: 4.9,
    },
    {
      title: 'Pro Trader Package',
      courses: ['All 4 Courses', 'Mentorship', 'Live Support', 'Daily Signals', 'VIP Group'],
      originalPrice: 20000,
      price: '₹17,000',
      priceValue: 17000,
      savings: 3000,
      addOns: ['Mentorship', 'Live Support', 'Daily Signals', 'VIP Group Access'],
      description: 'Complete package with courses plus premium add-ons for accelerated learning.',
      students: 650,
      rating: 5.0,
    },
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const displayCourses = loading ? staticCourses : courses;

  const filteredCourses = displayCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={coursesImage} 
            alt="Learning and education" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Expert-Led Courses</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn from industry professionals and master the skills you need to succeed
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-muted-foreground" />
                <div className="flex gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                      className={selectedLevel === level ? 'bg-primary' : ''}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combo Courses Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cost-Effective Combo Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Save more with our bundled courses and premium add-ons for complete trading mastery
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {comboCourses.map((combo, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="default" className="bg-accent text-accent-foreground">
                      COMBO OFFER
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground line-through">₹{combo.originalPrice.toLocaleString()}</div>
                      <span className="text-2xl font-bold text-primary">{combo.price}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{combo.title}</CardTitle>
                  <CardDescription className="text-accent font-semibold">
                    Save ₹{combo.savings.toLocaleString()}!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4">{combo.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {combo.courses.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <span className="mr-2">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {combo.addOns && (
                    <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                      <h4 className="font-semibold mb-2 text-accent">Premium Add-ons (₹2,000 value):</h4>
                      <ul className="space-y-1">
                        {combo.addOns.map((addon, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <span className="mr-2">⭐</span> {addon}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Star size={16} className="mr-1 fill-accent text-accent" />
                      <span className="font-semibold">{combo.rating}</span>
                      <span className="text-muted-foreground ml-1">({combo.students}+ enrolled)</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Get Combo Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Individual Courses</h2>
            <p className="text-lg text-muted-foreground">Choose courses that match your learning needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}
                      className={course.level === 'Beginner' ? 'bg-accent' : ''}
                    >
                      {course.level}
                    </Badge>
                    <span className="text-2xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    by {course.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1 text-sm">{course.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={16} className="mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users size={16} className="mr-2" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star size={16} className="mr-1 fill-accent text-accent" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  
                  {lectures[course.id] && lectures[course.id].length > 0 && (
                    <Accordion type="single" collapsible className="mb-4">
                      <AccordionItem value="demo">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center gap-2">
                            <PlayCircle className="h-4 w-4" />
                            <span>Watch Demo Lecture (Free)</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {lectures[course.id].map((lecture) => (
                              <div key={lecture.id} className="p-3 bg-accent/20 rounded">
                                <p className="font-medium text-sm">{lecture.title}</p>
                                <p className="text-xs text-muted-foreground">{lecture.duration}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleEnroll(course.id)}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          )}

          {/* Add-ons Info */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Premium Add-ons Available</CardTitle>
                <CardDescription>Enhance any course with these premium features for just ₹2,000</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded">⭐</div>
                    <div>
                      <h4 className="font-semibold">Personal Mentorship</h4>
                      <p className="text-sm text-muted-foreground">One-on-one guidance from experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded">⭐</div>
                    <div>
                      <h4 className="font-semibold">Live Support</h4>
                      <p className="text-sm text-muted-foreground">Real-time help when you need it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded">⭐</div>
                    <div>
                      <h4 className="font-semibold">Daily Signals</h4>
                      <p className="text-sm text-muted-foreground">Professional trading signals daily</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded">⭐</div>
                    <div>
                      <h4 className="font-semibold">VIP Group Access</h4>
                      <p className="text-sm text-muted-foreground">Exclusive community of traders</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
