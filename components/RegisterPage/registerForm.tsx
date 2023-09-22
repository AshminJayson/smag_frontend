import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Switch } from "@nextui-org/switch";
import Link from "next/link";
import React from "react";

type Props = {};

export default function RegisterForm({}: Props) {
  return (
    <Card className="w-1/3 h-fit p-4">
      <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
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
        <Switch defaultChecked size="sm">
          Are you a business owner?
        </Switch>
        <Button className="font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2">
          Sign Up
        </Button>
      </form>
      <Link href="/">
        <p className="text-center">
          Already have an account?
          <span className="text-s3"> Click here!</span>
        </p>
      </Link>
    </Card>
  );
}
