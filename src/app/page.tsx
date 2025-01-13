import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-6 h-screen">
      <h1 className="text-3xl font-semibold">Invoicipedia App</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
