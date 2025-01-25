import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { Invoices } from "@/db/schema";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";

import React from "react";

import InvoicePage from "./invoice";

export default async function Dashboard({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId } = await auth();

  if (!userId) return;

  const invoiceId = await parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.userId, userId), eq(Invoices.id, invoiceId)))
    .limit(1);

  if (!result) {
    notFound();
  }

  return <InvoicePage invoice={result} />;
}
