"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Notice } from "@/components/ui/Notice";
import { isValidEmail, required } from "@/lib/validation";

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): RegisterErrors {
    const nextErrors: RegisterErrors = {};
    const nameRequired = required(name, "Name");
    if (nameRequired) {
      nextErrors.name = nameRequired;
    }

    const emailRequired = required(email, "Email");
    if (emailRequired) {
      nextErrors.email = emailRequired;
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    const passwordRequired = required(password, "Password");
    if (passwordRequired) {
      nextErrors.password = passwordRequired;
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <Input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={errors.name}
      />
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.email}
      />
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
        hint="Use at least 8 characters."
        trailing={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword((value) => !value)}
            aria-pressed={showPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        }
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        label="Confirm password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        error={errors.confirmPassword}
      />
      <Button type="submit" className="w-full">
        Register
      </Button>
      {submitted ? (
        <Notice title="Account creation placeholder">
          No account was created. Connect this form to your registration API when you add a
          backend.
        </Notice>
      ) : null}
      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-700 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
