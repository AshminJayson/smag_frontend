"use client";

import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/Context";
import { toast } from "sonner";
import { API } from "../fetching";

type Props = {};

export default function RegisterForm({}: Props) {
    const router = useRouter();
    const { register } = useAuth()!;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(
                e.target.username.value,
                e.target.password.value,
                e.target.isowner.checked
            );

            toast.success("User Registered");
        } catch (err) {
            toast.error("Registered Failed!");
        }
    };

    return (
        <>
            <Card className="w-1/3 h-fit p-4">
                <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
                <h2 className="text-center font-light text-sm">
                    Please enter your details below
                </h2>
                <form
                    className="flex flex-col p-4 gap-4"
                    onSubmit={handleSubmit}
                >
                    <Input
                        type="text"
                        placeholder="Enter your username"
                        label="Username"
                        name="username"
                        id="username"
                        isRequired
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                        id="password"
                        isRequired
                    />
                    <Switch
                        defaultChecked
                        size="sm"
                        id="isowner"
                        name="isowner"
                    >
                        Are you a business owner?
                    </Switch>
                    <Button
                        className="font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2"
                        type="submit"
                    >
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
        </>
    );
}
