import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { GraduationCap, Search, MapPin, Building } from "lucide-react";

const Colleges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const collegesList = [
    {
      id: 1,
      name: "Delhi University",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
      type: "Public",
      location: "Delhi",
      rating: 4.5,
      courses: 150,
      fees: "₹50,000 - ₹2,00,000",
      placement: "95%",
      established: 1922
    },
    {
      id: 2,
      name: "Amity University",
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop",
      type: "Private",
      location: "Noida",
      rating: 4.3,
      courses: 120,
      fees: "₹1,00,000 - ₹3,00,000",
      placement: "92%",
      established: 2003
    },
    {
      id: 3,
      name: "Lovely Professional University",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop",
      type: "Private",
      location: "Punjab",
      rating: 4.4,
      courses: 200,
      fees: "₹80,000 - ₹2,50,000",
      placement: "93%",
      established: 2005
    },
    {
      id: 4,
      name: "Jamia Millia Islamia",
      logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop",
      type: "Central",
      location: "Delhi",
      rating: 4.6,
      courses: 100,
      fees: "₹30,000 - ₹1,50,000",
      placement: "94%",
      established: 1920
    },
    {
      id: 5,
      name: "Jawaharlal Nehru University",
      logo: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=100&h=100&fit=crop",
      type: "Central",
      location: "Delhi",
      rating: 4.7,
      courses: 80,
      fees: "₹20,000 - ₹1,00,000",
      placement: "96%",
      established: 1969
    },
    {
      id: 6,
      name: "Guru Gobind Singh Indraprastha University",
      logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=100&h=100&fit=crop",
      type: "Public",
      location: "Delhi",
      rating: 4.2,
      courses: 90,
      fees: "₹40,000 - ₹1,80,000",
      placement: "91%",
      established: 1998
    }
  ];

  const filteredColleges = collegesList.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || college.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
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
            <Link to="/colleges" className="text-sm font-medium text-primary">
              Colleges
            </Link>
            <Link to="/compare" className="text-sm font-medium transition-colors hover:text-primary">
              Compare
            </Link>
            <Link to="/auth" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Explore Colleges</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Discover and compare top colleges across India. Find the perfect match for your educational goals.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search colleges by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="central">Central</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Colleges Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredColleges.length} of {collegesList.length} colleges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <Card key={college.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={college.logo} 
                      alt={college.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-2">{college.name}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Building className="h-3 w-3 mr-1" />
                          {college.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {college.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                      ★ {college.rating}
                    </Badge>
                    <Badge variant="outline">{college.courses} Courses</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Established</span>
                      <span className="font-semibold">{college.established}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Placement</span>
                      <span className="font-semibold text-primary">{college.placement}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm block mb-1">Fees Range</span>
                    <span className="font-semibold text-sm">{college.fees}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild className="flex-1" variant="outline">
                    <Link to={`/compare?college=${college.id}`}>View Details</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link to="/compare">Compare</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Try adjusting your search criteria or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Colleges;