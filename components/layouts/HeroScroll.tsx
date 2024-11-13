"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Desbloque el poder del <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Diseño de Modas
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`https://theartcareerproject.com/wp-content/uploads/2021/07/How-to-Become-a-Fashion-Designer.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
