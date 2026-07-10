import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Contexts/AuthContext/AuthContext";
import { GoogleOutlined } from "@ant-design/icons";
import { useContext } from "react";

const SocialLogin = () => {
  console.log("Social login component rendered");
    const { signInWithGoogle } = useContext(AuthContext);
    const handleGoogleLogin = (e) => {
      e.preventDefault();
      console.log("Google login clicked");
       signInWithGoogle()
      .then(async(result) => {
        const user = result.user;
        console.log(user);
        const currentUser = {
          name: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };
        console.log(currentUser);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
    });
}
  return (
   <div className="text-center m-6">
     <Button onClick={handleGoogleLogin} className="w-full rounded-md" variant="outline">
      <GoogleOutlined className="mr-2" />
      Continue with Google
    </Button>
   </div>
  );
};

export default SocialLogin;
