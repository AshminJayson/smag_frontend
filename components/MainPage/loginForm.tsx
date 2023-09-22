"use client";

import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

export default function LoginForm({}: Props) {
  const router = useRouter();
  return (
    <Card className="w-1/3 h-fit p-4">
      <h1 className="text-2xl font-semibold text-center">Sign In</h1>
      <h2 className="text-center font-light text-sm">
        Please enter your details below
      </h2>
      <form className="flex flex-col p-4 gap-4">
        <Input
          type="text"
          placeholder="Enter your username"
          label="Username"
          name="username"
          id="username"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
        />
        <Button
          className="font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2"
          onPress={() => router.push("/selecttrack")}
        >
          Login
        </Button>
      </form>
      <Link href="/register">
        <p className="text-center">
          Don't have an account?
          <span className="text-s3"> Register here!</span>
        </p>
      </Link>
    </Card>
  );
}
