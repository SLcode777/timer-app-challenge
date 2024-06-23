import { SetTimer } from "@/components/set-timer.jsx";
import { Timer } from "@/components/timer.jsx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 bg-stone-950">
      <section className="font-bold text-red-500">
        <h1 className="text-2xl font-bold text-yellow-500 pb-10">
          My Amazing Timer App
        </h1>
      </section>
      <section>
        <SetTimer />
      </section>
      <section className="mt-10">
        <Timer/>
      </section>
    </main>
  );
}
