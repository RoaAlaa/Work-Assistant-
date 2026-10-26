"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Notice } from "@/components/ui/Notice";
import { isValidEmail, required } from "@/lib/validation";

type LoginErrors = {
  email?: string;
  password?: string;
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): LoginErrors {
    const nextErrors: LoginErrors = {};
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
        autoComplete="current-password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
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
      <Button type="submit" className="w-full">
        Log in
      </Button>
      {submitted ? (
        <Notice title="Authentication placeholder">
          Login was not sent to a server. Add your auth API here, then navigate the user to the
          dashboard.
        </Notice>
      ) : null}
      <p className="text-sm text-slate-600">
        Need an account?{" "}
        <Link href="/register" className="font-medium text-blue-700 hover:underline">
          Register
        </Link>
      </p>
      <p className="text-sm text-slate-500">
        Exploring the UI?{" "}
        <Link href="/dashboard" className="font-medium text-blue-700 hover:underline">
          Open the dashboard
        </Link>
      </p>
    </form>
  );
}
