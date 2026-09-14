"use client";

import { toast } from "@/components/ui/toast";
import { useGoogleAuth } from "@/hooks";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleAuth(); //form transtack queary

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Logged in Successfully",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };

  /* (google login) react-oauth/google npm প্যাকেজ থেকে আসতেছে   */

  return (
      <GoogleLogin 
      // এখানে কালার যুক্ত করা যায় theme এ  
      theme="filled_blue"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess} 
      onError={handleGoogleError}>
      </GoogleLogin>
  );
}

