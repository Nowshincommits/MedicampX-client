import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loginAnimation from "../../../../assets/Lotties/Login.lottie";
import { useLocation, useNavigate, Link } from "react-router";
import { Mail, Lock, HeartPulse, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useContext, useState } from "react";
import { AuthContext } from "@/Contexts/AuthContext/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { signInUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        form.reset();
        navigate(from);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);

        if (error.code === "auth/invalid-credential") {
          alert("Invalid email or password.");
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-4">
            <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center">
              <HeartPulse className="h-8 w-8 text-cyan-700" />
            </div>
          </div>

          <div className="max-w-lg mx-auto lg:mx-0">
            <h1 className="text-4xl lg:text-5xl font-bold text-cyan-700 mb-4">
              Welcome Back to{" "}
              <span className="text-black">MediCamp</span>
              <span className="text-cyan-600">X</span>
            </h1>

            <p className="text-gray-600 text-lg">
              Sign in to manage your medical camp registrations, access
              healthcare services, and stay connected with healthcare
              professionals.
            </p>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <DotLottieReact
              src={loginAnimation}
              loop
              autoplay
              style={{ width: "450px" }}
            />
          </div>
        </div>

        {/* Right Side */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-cyan-700">
              Sign In
            </CardTitle>

            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>

                  <button
                    type="button"
                    className="text-sm text-cyan-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                Sign In
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>

              <SocialLogin from={from} />

              <p className="text-center text-sm text-gray-500">
                Don't have an account?
                <Link
                  to="/signup"
                  className="ml-1 text-cyan-700 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;