"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Algo salio mal
      </h1>
      <br />
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        color="secondary"
        variant="flat"
      >
        Prueba otra vez
      </Button>
    </div>
  );
}
