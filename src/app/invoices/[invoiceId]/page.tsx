import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { Customers, Invoices } from "@/db/schema";
import { notFound } from "next/navigation";
import { and, eq, isNull } from "drizzle-orm";

import React from "react";

import InvoicePage from "./invoice";

export default async function Dashboard({
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
  let result;
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(eq(Invoices.organizationId, orgId), eq(Invoices.id, invoiceId))
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.userId, userId),
          eq(Invoices.id, invoiceId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.Invoices,
    customer: result.customers,
  };

  return <InvoicePage invoice={invoice} />;
}
