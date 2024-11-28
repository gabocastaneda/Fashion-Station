"use client";
import React, { use } from "react";
import { AlertDialogDemo } from "@/components/layouts/NuevaPrenda";
import { Button } from "@nextui-org/button";
import CardDemo from "@/components/layouts/CardDemo";

export default function UserPage({ params }: any) {
  const user = use(params);
  const email = decodeURIComponent(user.userEmail);

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Bienvenido {email}
      </h1>
      <p className="my-5 text-lg">¿Qué quisieras hacer ahora?</p>
      <div className="flex flex-wrap gap-4 items-center">
        <AlertDialogDemo email={email} />
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
          Importar un archivo externo
        </Button>
      </div>
      <p className="my-5">Diseños recientemente vistos</p>
      <CardDemo email={email} />
    </>
  );
}
