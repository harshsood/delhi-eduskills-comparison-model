import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { GraduationCap, TrendingUp, Users, Award, Search, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Home = () => {
  const featuredColleges = [
    {
      id: 1,
      name: "Delhi University",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
      rating: 4.5,
      courses: 150,
      fees: "₹50,000 - ₹2,00,000",
      placement: "95%"
    },
    {
      id: 2,
      name: "Amity University",
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop",
      rating: 4.3,
      courses: 120,
      fees: "₹1,00,000 - ₹3,00,000",
      placement: "92%"
    },
    {
      id: 3,
      name: "Lovely Professional University",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop",
      rating: 4.4,
      courses: 200,
      fees: "₹80,000 - ₹2,50,000",
      placement: "93%"
    },
    {
      id: 4,
      name: "Jamia Millia Islamia",
      logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop",
      rating: 4.6,
      courses: 100,
      fees: "₹30,000 - ₹1,50,000",
      placement: "94%"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Delhi Eduskills
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/colleges" className="text-sm font-medium transition-colors hover:text-primary">
              Colleges
            </Link>
            <Link to="/compare" className="text-sm font-medium transition-colors hover:text-primary">
              Compare
            </Link>
            <Link to="/auth" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
            <Button asChild variant="default">
              <Link to="/auth">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container grid lg:grid-cols-2 gap-8 py-16 lg:py-24">
          <div className="flex flex-col justify-center space-y-6">
            <Badge className="w-fit">India's #1 College Comparison Platform</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Find Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Perfect College</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Compare colleges, courses, fees, placements, and make informed decisions about your future. Join thousands of students who found their dream college with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link to="/compare">
                  <Search className="mr-2 h-5 w-5" />
                  Compare Colleges
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/colleges">
                  Browse Colleges
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Students studying together" 
              className="rounded-lg shadow-2xl object-cover w-full h-[400px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Colleges Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Colleges</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore top colleges and universities across India
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredColleges.map((college) => (
              <Card key={college.id} className="hover:shadow-lg transition-all duration-300 border-border">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={college.logo} 
                      alt={college.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{college.name}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                      ★ {college.rating}
                    </Badge>
                    <Badge variant="outline">{college.courses} Courses</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fees Range</span>
                    <span className="font-semibold">{college.fees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Placement</span>
                    <span className="font-semibold text-primary">{college.placement}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link to={`/compare?college=${college.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Delhi Eduskills?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive comparison tools to help you make the right choice
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Compare up to 3 colleges side-by-side with detailed metrics
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Real Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access verified placement records, fees, and ratings
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Read authentic reviews from current students
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get personalized counseling and admission support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Find Your Dream College?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who have made informed decisions with Delhi Eduskills
          </p>
          <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link to="/compare">
              Start Comparing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Delhi Eduskills</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner in finding the perfect college for your future.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/colleges" className="hover:text-primary transition-colors">Colleges</Link></li>
                <li><Link to="/compare" className="hover:text-primary transition-colors">Compare</Link></li>
                <li><Link to="/auth" className="hover:text-primary transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: info@delhieduskills.com</li>
                <li>Phone: +91 11 1234 5678</li>
                <li>Delhi, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Delhi Eduskills. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;