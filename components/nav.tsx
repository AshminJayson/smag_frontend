"use client";

import Link from "next/link";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Nav() {
    const [content, setContent] = useState("SALES");

    return (
        <div className=" w-full font-teko flex justify-between">
            <Link href="/">
                <span className="text-8xl">SMAG</span>
            </Link>
            <div className="flex gap-4">
                <span>SALES</span>
                <span>MARKETING</span>
                <span>ANALYTICS</span>
                <span>GROWTH</span>
            </div>
        </div>
    );
}
