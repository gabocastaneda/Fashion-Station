"use client";
import { Button } from "@nextui-org/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { HeartFilledIcon } from "../icons";
import Link from "next/link";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Crea",
    },
    {
      text: "increíbles",
    },
    {
      text: "diseños",
    },
    {
      text: "con",
    },
    {
      text: "Fashion",
      className: "text-purple-500 dark:text-purple-500",
    },
    {
      text: "Station.",
      className: "text-purple-500 dark:text-purple-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        El camino a la creativad y libertad empieza aquí.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Button
          as={Link}
          color="secondary"
          endContent={<HeartFilledIcon />}
          href="/login"
        >
          Únete ahora
        </Button>
      </div>
    </div>
  );
}
