import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) return;

  const results = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.userId, userId));

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Invoices</h1>
          <p>
            <Button asChild variant="ghost">
              <Link href="/invoices/new">
                <CirclePlus />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-left p-4">Date</TableHead>
              <TableHead className="text-left p-4">Customer</TableHead>
              <TableHead className="text-left p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium text-left">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block font-semibold p-4"
                  >
                    {new Date(result.createTs).toLocaleDateString("US")}
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block font-semibold p-4"
                  >
                    Phillip J fry
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  fry@planetexpress.com
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block font-semibold p-4"
                  >
                    <Badge
                      className={cn(
                        "rounded-full",
                        result.status === "open" && "bg-blue-500",
                        result.status === "paid" && "bg-green-600",
                        result.status === "void" && "bg-zinc-700",
                        result.status === "uncollectible" && "bg-red-800"
                      )}
                    >
                      {result.status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block font-semibold p-4"
                  >
                    ${(result.value / 100).toFixed(2)}{" "}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
