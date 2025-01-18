"use client";
import { createAction } from "@/app/actions";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { SyntheticEvent, useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import Container from "@/components/Container";

export default function New() {
  const [state, setState] = useState("ready");
  //   time

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === "pending") {
      event.preventDefault();
      return;
    }
    setState("pending");
  }

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
        </div>
        <Form
          action={createAction}
          className="grid gap-4 max-w-xs"
          onSubmit={handleOnSubmit}
        >
          <div>
            <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
              Billing Name
            </Label>
            <Input id="name" type="text" name="name" />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
              Billing Email
            </Label>
            <Input type="email" id="email" name="email" />
          </div>
          <div>
            <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
              Value
            </Label>
            <Input type="text" id="value" name="value" />
          </div>
          <div>
            <Label htmlFor="desc" className="block mb-2 font-semibold text-sm">
              Description
            </Label>
            <Textarea id="description" name="description" />
          </div>
          <div>
            <SubmitButton />
          </div>
        </Form>
      </Container>
    </main>
  );
}
