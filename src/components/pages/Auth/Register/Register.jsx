import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import registerAnimation from "../../../../assets/Lotties/register.lottie";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";

import { User, Mail, Lock, Phone, HeartPulse, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "@/hooks/useAxios";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "",
    },
  });
 
  const axiosInstance = useAxios();
  const password = watch("password");

  const handleSignUp = (data) => {
    const { email, password} = data;

    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        const userProfile = {
          email,
          role: "user",
          createdAt: new Date().toISOString(),
          last_login: new Date().toISOString()
        };
      const userResponse = axiosInstance.post("/users", userProfile);        
        console.log("User Profile:", userResponse.data);

        reset();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="lg:flex flex-col items-center justify-center mx-auto">
          <DotLottieReact
            src={registerAnimation}
            loop
            autoplay
            style={{ width: "500px" }}
          />

          <div className="max-w-md text-center space-y-4 mt-4 mx-auto">
            <h2 className="text-4xl font-bold text-cyan-700">
              Welcome to <span className="text-black">MediCamp</span>
              <span className="text-primary">X</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Register to participate in medical camps, connect with healthcare
              professionals, and stay updated about upcoming health services.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
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

          <form onSubmit={handleSubmit(handleSignUp)}>
            <CardContent className="space-y-4">
              {/* NAME */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-10"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-10"
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* DOB */}
              <div className="space-y-2">
                <Label>DOB</Label>
                <Input
                  type="date"
                  {...register("dob", {
                    required: "DOB is required",
                  })}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob.message}</p>
                )}
              </div>

              {/* GENDER */}
              <div className="space-y-2">
                <Label>Gender</Label>

                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Min 6 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 mt-4">
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              
              <p className="text-sm text-center">
                Already have an account?
                <Link to="/login" className="text-cyan-700 ml-1">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
          <SocialLogin></SocialLogin>
        </Card>
      </div>
    </div>
  );
};

export default Register;
