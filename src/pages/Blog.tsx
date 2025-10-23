import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const posts = [
    {
      title: '5 Common Investment Mistakes to Avoid in 2024',
      category: 'Investment Tips',
      author: 'Sarah Chen',
      date: 'Mar 15, 2024',
      excerpt: 'Learn about the most common pitfalls new investors make and how to avoid them to protect your portfolio.',
      readTime: '5 min read',
    },
    {
      title: 'Understanding Market Volatility: A Beginner\'s Guide',
      category: 'Education',
      author: 'Michael Torres',
      date: 'Mar 12, 2024',
      excerpt: 'Market ups and downs can be scary. Here\'s what you need to know to stay calm and make smart decisions.',
      readTime: '7 min read',
    },
    {
      title: 'The Rise of ESG Investing: What You Need to Know',
      category: 'Trends',
      author: 'Jennifer Park',
      date: 'Mar 10, 2024',
      excerpt: 'Environmental, Social, and Governance factors are becoming crucial in investment decisions. Learn why and how to incorporate ESG.',
      readTime: '6 min read',
    },
    {
      title: 'Options Trading Strategies for Income Generation',
      category: 'Advanced Strategies',
      author: 'David Kim',
      date: 'Mar 8, 2024',
      excerpt: 'Discover how to use options to generate consistent income while managing your risk effectively.',
      readTime: '8 min read',
    },
    {
      title: 'Real Estate vs. Stock Market: Where to Invest?',
      category: 'Comparisons',
      author: 'Lisa Rodriguez',
      date: 'Mar 5, 2024',
      excerpt: 'A comprehensive comparison of real estate and stock market investments to help you make the right choice.',
      readTime: '6 min read',
    },
    {
      title: 'Cryptocurrency in 2024: What\'s Changed?',
      category: 'Crypto',
      author: 'Alex Johnson',
      date: 'Mar 3, 2024',
      excerpt: 'The crypto landscape is evolving rapidly. Here are the key developments every investor should know about.',
      readTime: '7 min read',
    },
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Investment Insights & Resources
            </h1>
            <p className="text-xl mb-8">
              Expert analysis, market trends, and practical investment tips to help you succeed
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg bg-white text-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-accent"></div>
                <div className="md:w-3/5 p-8">
                  <Badge className="mb-4 bg-accent text-white">Featured</Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    2024 Market Outlook: What Every Investor Should Know
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      Sarah Chen
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Mar 20, 2024
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Our comprehensive analysis of market trends, economic indicators, and investment opportunities 
                    for the year ahead. Essential reading for serious investors.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Read Full Article <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow flex flex-col">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-secondary text-secondary-foreground">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Read More <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest market insights, investment tips, and exclusive content delivered to your inbox weekly
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-foreground"
            />
            <Button className="bg-accent hover:bg-accent/90 text-white font-semibold px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
