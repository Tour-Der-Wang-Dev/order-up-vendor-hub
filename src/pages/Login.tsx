
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
      toast.success("Login successful", {
        description: "Welcome back to OrderUp Vendor Hub!",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/90494f25-3cb7-4324-84b1-ae6a73fe364b.png"
              alt="Tour Der Wang"
              className="h-12 mr-2"
            />
            <h1 className="text-2xl font-bold text-vendor-orange">OrderUp</h1>
          </div>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Vendor Login</CardTitle>
            <CardDescription>
              Sign in to manage your restaurant on OrderUp
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm text-vendor-orange hover:text-vendor-dark-orange"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me for 30 days
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-vendor-orange hover:bg-vendor-dark-orange" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have a vendor account?{" "}
            <a href="#" className="text-vendor-orange font-medium hover:underline">
              Contact us to register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
