"use client";
import { title, subtitle } from "@/components/primitives";
import { HeroScrollDemo } from "@/components/layouts/HeroScroll";
import { BentoGridThirdDemo } from "@/components/layouts/BentoGrid";
import { AnimatedTestimonialsDemo } from "@/components/layouts/AnimatedTestional";
import { AppleCardsCarouselDemo } from "@/components/layouts/AppleCards";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Crea&nbsp;</span>
        <span className={title({ color: "violet" })}>hermosos&nbsp;</span>
        <br />
        <span className={title()}>
          diseños de ropa sin importar tu experiencia.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Asombroso, rápido y moderno con Fashion Station.
        </div>
      </div>
      <br />
      <br />
      <br />
      <BentoGridThirdDemo />

      {/* <TextGenerateEffectDemo /> */}

      <HeroScrollDemo />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Escucha a nuestros usuarios
      </h3>
      <AnimatedTestimonialsDemo />
      <AppleCardsCarouselDemo />
    </section>
  );
}
