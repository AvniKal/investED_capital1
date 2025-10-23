-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration TEXT,
  instructor TEXT,
  students INTEGER DEFAULT 0,
  rating DECIMAL(2,1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lectures table
CREATE TABLE public.lectures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration TEXT,
  order_index INTEGER NOT NULL,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enrollments table
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  payment_status TEXT DEFAULT 'pending',
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Policies for courses (public read)
CREATE POLICY "Courses are viewable by everyone"
ON public.courses
FOR SELECT
USING (true);

-- Policies for lectures
CREATE POLICY "Demo lectures are viewable by everyone"
ON public.lectures
FOR SELECT
USING (is_demo = true);

CREATE POLICY "Enrolled users can view all lectures"
ON public.lectures
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.course_id = lectures.course_id
    AND enrollments.user_id = auth.uid()
    AND enrollments.payment_status = 'completed'
  )
);

-- Policies for enrollments
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments"
ON public.enrollments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
ON public.enrollments
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for timestamps
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample courses
INSERT INTO public.courses (title, level, price, duration, students, rating, instructor, description) VALUES
('Stock and Market Fundamentals', 'Beginner', 2000, '4 weeks', 3240, 4.9, 'Expert Trading Team', 'Master the fundamentals of stock markets, trading basics, and build a strong foundation for your trading journey.'),
('Technical and Traditional Analysis', 'Intermediate', 3000, '6 weeks', 2850, 4.8, 'Expert Trading Team', 'Learn chart patterns, indicators, candlestick analysis, and traditional technical analysis methods.'),
('SMC Core Course', 'Advanced', 5000, '8 weeks', 1920, 4.9, 'Expert Trading Team', 'Smart Money Concepts - Understand institutional trading, order blocks, and market structure.'),
('Advanced ICT Course', 'Advanced', 8000, '10 weeks', 1450, 5.0, 'Expert Trading Team', 'Inner Circle Trader methodology - Advanced price action, liquidity concepts, and institutional strategies.');

-- Insert sample lectures with demo lectures for each course
INSERT INTO public.lectures (course_id, title, description, duration, order_index, is_demo)
SELECT id, 'Introduction to ' || title, 'Free demo lecture introducing the course content', '15 mins', 0, true
FROM public.courses;

INSERT INTO public.lectures (course_id, title, description, duration, order_index, is_demo)
SELECT id, 'Module 1: Getting Started', 'Core concepts and fundamentals', '45 mins', 1, false
FROM public.courses;

INSERT INTO public.lectures (course_id, title, description, duration, order_index, is_demo)
SELECT id, 'Module 2: Advanced Techniques', 'Deep dive into advanced strategies', '60 mins', 2, false
FROM public.courses;