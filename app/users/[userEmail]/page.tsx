"use client";
import React from "react";
import { useRouter } from "next/navigation";

import CardDemo from "@/components/layouts/CardDemo";
import { Button } from "@nextui-org/button";

export default function UserPage({ params }: any) {
  const email = decodeURIComponent(params.userEmail);
  const emailUrl = params.userEmail;
  const router = useRouter();

  return (
    <section>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Bienvenido {email}
      </h1>
      <p className="my-5 text-lg">¿Qué quisieras hacer ahora?</p>
      <div className="flex flex-wrap gap-4 items-center">
        <Button
          color="secondary"
          variant="flat"
          onClick={() => router.push(`/users/${email}/new`)}
        >
          Crear nuevo diseño
        </Button>
        <Button
          color="warning"
          variant="flat"
          onClick={() => {
            console.log("Export");
          }}
        >
          Exportar y compartir
        </Button>
        <Button
          color="default"
          variant="flat"
          onClick={() => {
            console.log("Import");
          }}
        >
          Impotar un archivo externo
        </Button>
      </div>
      <p className="my-5">Diseños recientemente vistos</p>
      <CardDemo email={email} />
    </section>
  );
}
