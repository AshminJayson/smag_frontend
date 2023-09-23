import RegisterForm from "@/components/RegisterPage/registerForm";
import Nav from "@/components/nav";
import { Image } from "@nextui-org/image";
import React from "react";

type Props = {};

const Page = (props: Props) => {
    return (
        <main className="flex min-h-screen h-full flex-col items-center justify-center p-10">
            <Nav />
            <section className="w-full rounded-lg flex justify-between items-center">
                <Image
                    alt="hero-image"
                    fetchPriority="high"
                    src="/images/loginPageSVG.svg"
                    width={500}
                    height={500}
                    alt=""
                />
                <RegisterForm />
            </section>
        </main>
    );
};

export default Page;
