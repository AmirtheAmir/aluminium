import { Navigation } from "@/components/organisms/navigation";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col px-12 pt-6">
      <div className="mx-auto flex w-full max-w-[1344px] flex-1 flex-col">
        <Navigation />
      </div>
    </main>
  );
}
