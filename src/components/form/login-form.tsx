
"use client";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { loginSchema } from "@/validation";
import { useGoogleAuth, useLogin } from "@/hooks";

import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {mutate: login,isPending: loginPending,} = useLogin();

  const router = useRouter();
  const {mutate:googleLogin}=useGoogleAuth()

  
  const form = useForm({
    defaultValues: {
      email: "saeedalom2021@gmail.com",
      password: "AbuSaeed123!",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        // =========================
        // Login Success
        // =========================
        onSuccess: (res) => {
          console.log("Login successful:", res);

          toast.add({
            title: "Login Successful",
            description: "Welcome back!",
            type: "success",
          });

          // Login সফল হলে home page-এ যাবে
          router.push("/");
        },

        // =========================
        // Login Error
        // =========================
        onError: (err) => {
          console.error("Login failed:", err);

          toast.add({
            title: "Authorization Failure",
            description:
              err.message || "Invalid email or password.",
            type: "error",
          });
        },
      });
    },
  });

  // Google Login এর Function  
  const handleGoogleSuccess=(credentialResponse:{credential?:string})=>{
    const idToken= credentialResponse.credential
    if(!idToken){
      toast.add({
      title:"Google Auth Failed",
      description:"Something went wron.please try again",
      type:"error"
    })
    return 
    }

    googleLogin({idToken},{
      onSuccess:()=>{
         toast.add({
          title:"logged in Successfully",
          description:"Welcome Back",
          type:"success"
        })

        router.push("/");

      },
      onError:(err)=>{
        toast.add({
          title:"Google Auth Failed",
          description:err.message,
          type:"error"
        })
      }
    })

  }

  const handleGoogleError=()=>{
    toast.add({
      title:"Google Auth Failed",
      description:"Something went wron.please try again",
      type:"error"
    })
  }



  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>

        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* =========================
              Email Field
          ========================= */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Enter your email"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* =========================
              Password Field
          ========================= */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                      className="pr-10"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* =========================
              Submit Button
          ========================= */}
          <Button
            type="submit"
            disabled={loginPending}
            className="w-full"
          >
            {loginPending ? (
              <>
                <Spinner />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>
      <FieldSeparator>Or</FieldSeparator>
      {/* (google login) react-oauth/google npm প্যাকেজ থেকে আসতেছে   */}
      <GoogleLogin 
      // এখানে কালার যুক্ত করা যায় theme এ  
      theme="filled_blue"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess} 
      onError={handleGoogleError}>
      </GoogleLogin>
    </div>
  );
}

