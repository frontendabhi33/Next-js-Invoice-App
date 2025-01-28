import { Badge } from "@/components/ui/badge";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";

import Container from "@/components/Container";

import React from "react";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId, orgId } = await auth();

  if (!userId) return;

  const invoiceId = await parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceId))

    .limit(1);

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.Invoices,
    customer: result.customers,
  };

  return (
    <main className="w-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoice #{invoice.id}
            <Badge
              className={cn(
                "rounded-full",
                invoice.status === "open" && "bg-blue-500",
                invoice.status === "paid" && "bg-green-600",
                invoice.status === "void" && "bg-zinc-700",
                invoice.status === "uncollectible" && "bg-red-800"
              )}
            >
              {invoice.status}
            </Badge>
          </h1>
        </div>
        <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)} </p>
        <p className="text-lg mb-8">{invoice.description}</p>
        <h2 className="font-bold text-lg mb-4">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString("US")}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>{invoice.customer.name}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
