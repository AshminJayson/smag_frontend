"use client";

import "./globals.css";
import { Inter, Teko } from "next/font/google";
import { Toaster, toast } from "sonner";
import { Providers } from "./providers";
import { useAuth } from "./contexts/context";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const teko = Teko({ subsets: ["latin"], variable: "--font-teko" });
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

    authCheck();
    return (
        <html lang="en">
            <body className={`${inter.className} ${teko.variable}`}>
                <Providers>{children}</Providers>
                <Toaster richColors />
            </body>
        </html>
    );
}
