import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { authService } from "@/services/auth";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailSchema = z.string().email("Invalid email address").max(255);
  const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(100);
  const otpSchema = z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must contain only numbers");

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
      toast({
        title: "Validation Error",
        description: emailValidation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    if (!name || name.trim().length === 0 || name.trim().length > 100) {
      toast({
        title: "Validation Error",
        description: "Name is required and must be less than 100 characters",
        variant: "destructive"
      });
      return;
    }

    if (!phone || phone.trim().length === 0) {
      toast({
        title: "Validation Error",
        description: "Phone number is required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.sendOTP(email, phone, name);

      setCurrentEmail(email);
      setCurrentPhone(phone);
      setCurrentName(name);
      setIsOtpSent(true);

      toast({
        title: "OTP Sent",
        description: `A 6-digit OTP has been sent to ${phone}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send OTP",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp") as string;

    const otpValidation = otpSchema.safeParse(otp);
    if (!otpValidation.success) {
      toast({
        title: "Validation Error",
        description: otpValidation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.verifyOTP(currentEmail, currentPhone, currentName, otp);

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });

      setTimeout(() => {
        navigate("/compare");
      }, 1500);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("login-email") as string;
    const password = formData.get("login-password") as string;

    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
      toast({
        title: "Validation Error",
        description: emailValidation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      toast({
        title: "Validation Error",
        description: passwordValidation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login(email, password);

      if (response.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });

        setTimeout(() => {
          navigate("/compare");
        }, 1500);
      } else {
        toast({
          title: "Login Failed",
          description: response.error || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Delhi Eduskills
            </span>
          </Link>
        </div>
      </header>

      {/* Auth Form */}
      <div className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                {!isOtpSent ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="student@example.com"
                        required
                        maxLength={255}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        maxLength={15}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send OTP"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        name="otp"
                        placeholder="123456"
                        required
                        maxLength={6}
                        pattern="\d{6}"
                      />
                      <p className="text-sm text-muted-foreground">
                        OTP sent to {currentEmail}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify & Register"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOtpSent(false)}
                      >
                        Change Email
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-sm"
                      onClick={() => {
                        toast({
                          title: "OTP Resent",
                          description: `A new OTP has been sent to ${currentEmail}`,
                        });
                      }}
                    >
                      Resend OTP
                    </Button>
                  </form>
                )}
              </TabsContent>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="login-email"
                      type="email"
                      placeholder="student@example.com"
                      required
                      maxLength={255}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="login-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      maxLength={100}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-sm"
                    onClick={() => {
                      toast({
                        title: "Password Reset",
                        description: "Password reset link has been sent to your email",
                      });
                    }}
                  >
                    Forgot Password?
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;