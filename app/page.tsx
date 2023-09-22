import { Image } from "@nextui-org/image";
import LoginForm from "@/components/MainPage/loginForm";

import { useAuth } from "./Contexts/Context";

export default function Home() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center p-24">
      <section className="w-full rounded-lg flex justify-between items-center">
        <Image
          fetchPriority="high"
          src="/images/loginPageSVG.svg"
          width={500}
          height={500}
        />
        <LoginForm />
      </section>
    </main>
  );
}
