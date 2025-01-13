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
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col justify-center gap-6 my-12">
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
          <TableRow>
            <TableCell className="font-medium text-left p-4">
              <span className="font-semibold">10/31/2024</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span className="font-semibold">Phillip J fry</span>
            </TableCell>
            <TableCell className="text-left p-4">
              fry@planetexpress.com
            </TableCell>
            <TableCell className="text-center p-4">
              <Badge>Open</Badge>
            </TableCell>
            <TableCell className="text-right p-4">
              <span className="font-semibold">$250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
