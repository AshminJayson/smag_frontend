import RegisterForm from "@/components/RegisterPage/registerForm";
import { Image } from "@nextui-org/image";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center p-24">
      <section className="w-full rounded-lg flex justify-between items-center">
        <Image
          fetchPriority="high"
          src="/images/loginPageSVG.svg"
          width={400}
          height={400}
        />
        <RegisterForm />
      </section>
    </main>
  );
};

export default Page;
