"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  console.log(pending, "check");
  return (
    <>
      <Button className="relative w-full font-semibold">
        <span className={pending ? "text-transparent" : ""}>Submit</span>
        {pending && (
          <span className="w-full h-full absolute flex items-center justify-center text-gray-400">
            <LoaderCircle className="animate-spin" />
          </span>
        )}
      </Button>
    </>
  );
};

export default SubmitButton;
