import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { GraduationCap, Download, Share2, X, CheckCircle2, Phone, User, Mail, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Compare = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>(["", "", ""]);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    college: ""
  });

  const courses = [
    "B.A. LL.B. (Hons)",
    "B.Tech Computer Science",
    "MBA",
    "B.Com (Hons)",
    "BBA",
    "B.Sc Nursing",
    "B.Arch",
    "MBBS"
  ];

  const colleges = [
    { id: "du", name: "Delhi University" },
    { id: "lpu", name: "Lovely Professional University" },
    { id: "amity", name: "Amity University" },
    { id: "jamia", name: "Jamia Millia Islamia" },
    { id: "jnu", name: "Jawaharlal Nehru University" }
  ];

  const comparisonData = {
    du: {
      name: "Delhi University",
      rating: 4.5,
      institute: {
        type: "Public",
        estd: 1922,
        location: "Delhi"
      },
      fees: {
        total: "₹50,000",
        perYear: "₹12,500"
      },
      placement: {
        rate: "95%",
        average: "₹6.5 LPA",
        highest: "₹12 LPA"
      },
      admission: {
        exam: "CUET",
        cutoff: "95%"
      },
      facilities: ["Library", "Hostel", "Sports Complex", "Labs", "Cafeteria"]
    },
    lpu: {
      name: "Lovely Professional University",
      rating: 4.4,
      institute: {
        type: "Private",
        estd: 2005,
        location: "Punjab"
      },
      fees: {
        total: "₹2,50,000",
        perYear: "₹62,500"
      },
      placement: {
        rate: "93%",
        average: "₹5.8 LPA",
        highest: "₹42 LPA"
      },
      admission: {
        exam: "LPUNEST",
        cutoff: "75%"
      },
      facilities: ["Library", "Hostel", "Sports Complex", "Labs", "Cafeteria", "Gym", "Medical Center"]
    },
    amity: {
      name: "Amity University",
      rating: 4.3,
      institute: {
        type: "Private",
        estd: 2003,
        location: "Noida"
      },
      fees: {
        total: "₹3,00,000",
        perYear: "₹75,000"
      },
      placement: {
        rate: "92%",
        average: "₹6.2 LPA",
        highest: "₹15 LPA"
      },
      admission: {
        exam: "Amity Entrance",
        cutoff: "80%"
      },
      facilities: ["Library", "Hostel", "Sports Complex", "Labs", "International Exchange"]
    },
    jamia: {
      name: "Jamia Millia Islamia",
      rating: 4.6,
      institute: {
        type: "Central",
        estd: 1920,
        location: "Delhi"
      },
      fees: {
        total: "₹45,000",
        perYear: "₹11,250"
      },
      placement: {
        rate: "94%",
        average: "₹7 LPA",
        highest: "₹18 LPA"
      },
      admission: {
        exam: "JEE",
        cutoff: "92%"
      },
      facilities: ["Library", "Hostel", "Sports Complex", "Labs", "Medical Facility"]
    },
    jnu: {
      name: "Jawaharlal Nehru University",
      rating: 4.7,
      institute: {
        type: "Central",
        estd: 1969,
        location: "Delhi"
      },
      fees: {
        total: "₹40,000",
        perYear: "₹10,000"
      },
      placement: {
        rate: "96%",
        average: "₹7.5 LPA",
        highest: "₹20 LPA"
      },
      admission: {
        exam: "CUET",
        cutoff: "96%"
      },
      facilities: ["Library", "Hostel", "Sports Complex", "Research Centers", "International Programs"]
    }
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    toast({
      title: "Course Selected",
      description: `${course} will be applied to all colleges for accurate comparison`,
    });
  };

  const handleCollegeSelect = (index: number, collegeId: string) => {
    const newColleges = [...selectedColleges];
    newColleges[index] = collegeId;
    setSelectedColleges(newColleges);
    
    // Show registration dialog when at least 2 colleges are selected
    if (newColleges.filter(Boolean).length >= 2 && selectedCourse && !isRegistered) {
      setShowRegistrationDialog(true);
    }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(registrationData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setShowRegistrationDialog(false);
    setShowOtpDialog(true);
    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${registrationData.phone}`,
    });
  };

  const handleOtpVerification = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    // Simulate OTP verification (in real app, this would call backend)
    setShowOtpDialog(false);
    setIsRegistered(true);
    toast({
      title: "Verification Successful",
      description: "You can now view the comparison and download PDF",
    });
  };

  const handleDownloadPDF = () => {
    if (!isRegistered) {
      toast({
        title: "Registration Required",
        description: "Please complete registration to download comparison",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Download Started",
      description: "Your comparison PDF is being generated...",
    });
  };

  const handleShareWhatsApp = () => {
    if (!isRegistered) {
      toast({
        title: "Registration Required",
        description: "Please complete registration to share comparison",
        variant: "destructive"
      });
      return;
    }
    const text = `Check out this college comparison on Delhi Eduskills for ${selectedCourse}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

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
            <Link to="/colleges" className="text-sm font-medium transition-colors hover:text-primary">
              Colleges
            </Link>
            <Link to="/compare" className="text-sm font-medium text-primary">
              Compare
            </Link>
            <Link to="/auth" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Compare Section */}
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Compare Colleges</h1>
          <p className="text-muted-foreground">
            Select a course and up to 3 colleges to compare side by side
          </p>
        </div>

        {/* Course Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Step 1: Select Course</CardTitle>
            <CardDescription>
              This course will be automatically applied to all selected colleges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedCourse} onValueChange={handleCourseSelect}>
              <SelectTrigger className="w-full md:w-[400px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCourse && (
              <Badge className="mt-4 bg-primary/10 text-primary">
                Selected: {selectedCourse}
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* College Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Step 2: Select Colleges (Up to 3)</CardTitle>
            <CardDescription>
              Choose colleges to compare for {selectedCourse || "the selected course"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="text-sm font-medium mb-2 block">
                    College {index + 1}
                  </label>
                  <Select
                    value={selectedColleges[index]}
                    onValueChange={(value) => handleCollegeSelect(index, value)}
                    disabled={!selectedCourse}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select college ${index + 1}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem 
                          key={college.id} 
                          value={college.id}
                          disabled={selectedColleges.includes(college.id)}
                        >
                          {college.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {selectedColleges.filter(Boolean).length >= 2 && selectedCourse && isRegistered && (
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in">
            <Button onClick={handleDownloadPDF} size="lg" className="hover-scale">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button onClick={handleShareWhatsApp} variant="secondary" size="lg" className="hover-scale">
              <Share2 className="mr-2 h-5 w-5" />
              Share on WhatsApp
            </Button>
          </div>
        )}

        {/* Comparison Table */}
        {selectedColleges.filter(Boolean).length >= 2 && selectedCourse && isRegistered && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Comparison Results</h2>
            
            {/* Institute Information */}
            <Card>
              <CardHeader>
                <CardTitle>Institute Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedColleges.map((collegeId, index) => {
                    if (!collegeId) return null;
                    const data = comparisonData[collegeId as keyof typeof comparisonData];
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-4">{data.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type</span>
                            <span className="font-medium">{data.institute.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Established</span>
                            <span className="font-medium">{data.institute.estd}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location</span>
                            <span className="font-medium">{data.institute.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rating</span>
                            <Badge variant="secondary">★ {data.rating}</Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Course Fees */}
            <Card>
              <CardHeader>
                <CardTitle>Course Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedColleges.map((collegeId, index) => {
                    if (!collegeId) return null;
                    const data = comparisonData[collegeId as keyof typeof comparisonData];
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-4">{data.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Fees</span>
                            <span className="font-bold text-primary">{data.fees.total}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Per Year</span>
                            <span className="font-medium">{data.fees.perYear}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Placement */}
            <Card>
              <CardHeader>
                <CardTitle>Placement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedColleges.map((collegeId, index) => {
                    if (!collegeId) return null;
                    const data = comparisonData[collegeId as keyof typeof comparisonData];
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-4">{data.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Placement Rate</span>
                            <Badge className="bg-primary/10 text-primary">{data.placement.rate}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Average Package</span>
                            <span className="font-medium">{data.placement.average}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Highest Package</span>
                            <span className="font-medium">{data.placement.highest}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Admission */}
            <Card>
              <CardHeader>
                <CardTitle>Admission Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedColleges.map((collegeId, index) => {
                    if (!collegeId) return null;
                    const data = comparisonData[collegeId as keyof typeof comparisonData];
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-4">{data.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Entrance Exam</span>
                            <span className="font-medium">{data.admission.exam}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cutoff</span>
                            <span className="font-medium">{data.admission.cutoff}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure & Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedColleges.map((collegeId, index) => {
                    if (!collegeId) return null;
                    const data = comparisonData[collegeId as keyof typeof comparisonData];
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-4">{data.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {data.facilities.map((facility, idx) => (
                            <Badge key={idx} variant="outline">{facility}</Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Registration Required State */}
        {selectedColleges.filter(Boolean).length >= 2 && selectedCourse && !isRegistered && (
          <Card className="border-dashed animate-fade-in">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-scale-in">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Almost There!</h3>
              <p className="text-muted-foreground text-center max-w-md mb-4">
                Complete your registration to unlock the detailed comparison
              </p>
              <Button onClick={() => setShowRegistrationDialog(true)} size="lg" className="hover-scale">
                Complete Registration
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {(!selectedCourse || selectedColleges.filter(Boolean).length < 2) && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Your Comparison</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Select a course and at least 2 colleges to see a detailed side-by-side comparison
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Registration Dialog */}
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="sm:max-w-[500px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-2xl">Complete Your Registration</DialogTitle>
            <DialogDescription>
              Fill in your details to unlock the comparison and download PDF
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegistrationSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={registrationData.name}
                onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                required
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={registrationData.email}
                onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                required
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Mobile Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={registrationData.phone}
                onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                required
                maxLength={10}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="college" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Current College/University
              </Label>
              <Input
                id="college"
                placeholder="Optional"
                value={registrationData.college}
                onChange={(e) => setRegistrationData({ ...registrationData, college: e.target.value })}
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button type="submit" className="w-full hover-scale" size="lg">
              Send OTP
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="sm:max-w-[400px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-2xl">Verify Your Mobile</DialogTitle>
            <DialogDescription>
              Enter the 6-digit OTP sent to {registrationData.phone}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="flex flex-col items-center space-y-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <button 
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => toast({
                    title: "OTP Resent",
                    description: "A new OTP has been sent to your mobile",
                  })}
                >
                  Resend OTP
                </button>
              </p>
            </div>

            <Button 
              onClick={handleOtpVerification} 
              className="w-full hover-scale" 
              size="lg"
              disabled={otp.length !== 6}
            >
              Verify & Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Compare;