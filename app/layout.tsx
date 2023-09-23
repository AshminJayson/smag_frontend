"use client";

import "./globals.css";
import { Teko, Rubik } from "next/font/google";
import { Toaster, toast } from "sonner";
import { Providers } from "./providers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const rubik = Rubik({ subsets: ["latin"] });

const protectedPaths = ["/dashboard"];
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathName = usePathname();

    const authCheck = () => {
        if (
            protectedPaths.includes(pathName) &&
            !localStorage.getItem("currUser")
        ) {
            toast.error("Login to access this page");
            router.push("/");
        }
    };

    useEffect(() => {
        authCheck();
    }, []);

    return (
        <html lang="en">
            <body className={`${rubik.className}`}>
                <Providers>{children}</Providers>
                <Toaster richColors />
            </body>
        </html>
    );
}
