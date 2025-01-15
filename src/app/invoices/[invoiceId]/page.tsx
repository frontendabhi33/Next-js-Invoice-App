import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Dashboard({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = parseInt(params.invoiceId);

  const [results] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  console.log(results);

  return (
    <main className="max-w-5xl mx-auto flex flex-col justify-center gap-6 my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Invoice #{invoiceId}</h1>
      </div>
    </main>
  );
}
