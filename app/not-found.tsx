import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-lg mb-2">The page you are looking for does not exist.</p>
      <Button>
        <Link
          href="/"
          className="text-white hover:underline"
        >
          Go back to home
        </Link>
      </Button>
    </div>
  );
}

export default NotFound;
