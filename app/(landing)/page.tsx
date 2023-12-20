import { env } from "@/ts-env.mjs";

export default function Home() {
  console.log("ENV:", env);
  return (
    <section className="flex px-4 text-2xl hover:text-red-400 md:flex md:text-4xl">
      HOME P AGE
    </section>
  );
}
