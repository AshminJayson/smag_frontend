"use client";

import "./globals.css";
import { IBM_Plex_Mono, Inter, Poppins, Teko } from "next/font/google";
import { Toaster, toast } from "sonner";
import { Providers } from "./providers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// // const inter = Inter({ subsets: ["latin"] });
// const ibm = IBM_Plex_Mono({
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
//     subsets: ["latin"],
// });

const teko = Teko({ subsets: ["latin"], variable: "--font-teko" });

const protectedPaths = ["/dashboard"];
const autoLogPaths = ["/register", "/"];

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
        if (
            autoLogPaths.includes(pathName) &&
            !!localStorage.getItem("currUser")
        ) {
            router.push("/dashboard");
        }
    };

    authCheck();

    return (
        <html lang="en">
            <body className={`${teko.className}`}>
                <Providers>{children}</Providers>
                <Toaster richColors />
            </body>
        </html>
    );
}
