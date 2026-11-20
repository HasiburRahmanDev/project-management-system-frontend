"use client";
import { useForm } from "@tanstack/react-form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
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
        onSuccess: (res) => {
          toast.add({
            title: "Login Successful",
            description: "Welcome back! You have successfully logged in.",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Login Failed",
            description: "Invalid email or password.",
            type: "error",
          });
        },
      });
    },
  });
  return (
    <div>
      <p>Login to your account</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvaid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvaid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id="name"
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                  />
                  {isInvaid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvaid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvaid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="name"
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </button>
                  </div>
                  {isInvaid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <Button disabled={loginPending} type="submit">
            {loginPending ? <Spinner></Spinner> : "Login"}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or</FieldSeparator>
      {/* <GoogleLogin onSuccess={() => {}} onError={() => {}} /> */}
      <GoogleLogin onSuccess={() => {}} onError={() => {}} />
    </div>
  );
};

export default LoginForm;
