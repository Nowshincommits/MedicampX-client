import registerAnimation from "../../../../assets/Lotties/register.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User, Mail, Lock, Phone, HeartPulse } from "lucide-react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Registration logic here
    console.log("Register submitted");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <DotLottieReact
            src={registerAnimation}
            loop
            autoplay
            style={{ width: "500px" }}
          />

          <div className="max-w-md text-center space-y-4 mt-4">
            <h2 className="text-4xl font-bold text-cyan-700">
              Welcome to MediCampX
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Register to participate in medical camps, connect with healthcare
              professionals, and stay updated about upcoming health services.
            </p>
          </div>
        </div>

        {/* Register Card */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-0">
          <CardHeader className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center">
                <HeartPulse className="h-8 w-8 text-cyan-700" />
              </div>
            </div>

            <CardTitle className="text-3xl font-bold text-cyan-700">
              Create Account
            </CardTitle>

            <CardDescription>
              Join MediCampX and access healthcare services with ease.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXXXXXXXX"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 mt-4">
              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                Create Account
              </Button>

              <Button
                variant="outline"
                type="button"
                className="w-full"
              >
                Continue with Google
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Already have an account?
                <button
                  type="button"
                  className="ml-1 text-cyan-700 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>

              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;