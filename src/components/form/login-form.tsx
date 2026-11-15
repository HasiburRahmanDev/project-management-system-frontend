"use client";
import { useForm } from "@tanstack/react-form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field } from "../ui/field";

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });
  return (
    <div>
      <p>Login </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => {
            return (
              <Field>
                <Input name={field.name} />
              </Field>
            );
          }}
        </form.Field>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default LoginForm;
