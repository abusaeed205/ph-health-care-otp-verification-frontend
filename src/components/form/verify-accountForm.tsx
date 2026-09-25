"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "../ui/toast";
import { useVerifyAccount, useVerifyDoctorAccount } from "@/hooks";

// একটাই ফর্ম দিয়ে ডাক্তার এবং রোগী দুজন কেই ভেরিফাই করতে পারবো

const RESEND_COOLDOWN = 120; // OTP রিসেট টাইম

export default function VerifyAccountForm({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) {
  const searchParams = useSearchParams(); // এটা দিয়ে ডায়নামিক রাউটের email টা রিছিব করবো 
//  console.log(searchParams.get("emial"))
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

//  hook থেকে আসতেছে api এটার সহায্যে কল করা হচ্ছে 
// এখান -> Hook ->api ->lib/apiClient তার পর শেষে ডাটাবেইজে যাচ্ছে
  const { mutate: verifypatient, isPending: verifyPending } = useVerifyAccount();
  const {mutate:verifyDoctor}=useVerifyDoctorAccount()

  // mode Doctor হলে Doctor verify করো  অন্যথায় patent কে ভেরিফাই করো
 const verify = mode === "doctor" ? verifyDoctor : verifypatient;

  const email = searchParams.get("email") || "";

  //  যদি email না থাকে এবং verify route এ যেতে চায় তাহলে Home page এ পাঠিয়ে দাও
  useEffect(() => {
  if (!email) {
    router.push("/");
  }
}, [email, router]); 
  
// otp রিসেট হ্যান্ডেলার  
// biome-ignore lint/correctness/useExhaustiveDependencies: mount এ একবার চালানোর জন্য ইচ্ছাকৃত
  useEffect(() => {if (resendTimer <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTP = () => {
    // console.log(otp)
    //useState থেকে OTP টা নিয়ে চেক করছি 6 ডিজিট কিনা 
    if (otp.length !== 6) { 
      setIsInvalid(true);
      return;
    }

    const verifyData = {
     //postman থেকে নিবো
      email,
      otp,
    };
    console.log(verifyData)

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
        }

        if(mode === "doctor"){
            toast.add({
          title: "Verification Successful",
          description: "An admin Will approve your account.This may take time.please check your email in few days",
          type: "success",
        });
        router.push("/");
        return
        }

        
          toast.add({
          title: "Verification Successful",
          description: "An admin Will approve your account.This may take time.please check your email in few days",
          type: "success",
        });
        router.push("/");
        return 
      },
      onError: (err) => {
        toast.add({
          title: "Verification failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  //email না থাকলে Return করে দাও 
  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP we send you in your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* cardcontent এর মধ্যে install করা OTP Form টা রাখবো */}
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP(); //এখান থেকে Call করা হচ্ছে OTP Handel function
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel> 
            {/*Shadcn OTP Form  */}
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value); // form এর ভ্যালু useState এ সেট করে দিতেছি 
                if (isInvalid) { //পুরনো এরর মেসেজ সাথে সাথে সরে যায়
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off" //পুরনো OTP সাজেস্ট করবে না
              name="otp"
              id="otp" // otp লেখাতে click করলেও ফিল্ডে নিয়ে ‍যাবে
              pattern={REGEXP_ONLY_DIGITS} // number বাদে অন্য কিছু দিতে পারবে না 
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {/* কোড সঠিক না হলে Erorr দিবে (isInvalid) এটা useState থেকে পাই */}
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
              />
            )}
            {/* রিসেট টাইম কাউন্ট করতে  */}
            <FieldDescription>Resend in {resendTimer}</FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        {/* যাদি 0 থেকে বড় হয় তাহলে বাটন disabled থাকবে */}
        <Button disabled={resendTimer > 0}>Resend</Button>
        {/* otp-form এটা হলো form এর ID  */}
        <Button type="submit" form="otp-form"> 
          Submit
        </Button>
      </CardFooter>
    </Card>
  );

}