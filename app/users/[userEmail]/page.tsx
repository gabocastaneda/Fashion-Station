"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import CardDemo from "@/components/layouts/CardDemo";
import { Button } from "@nextui-org/button";

export default function UserPage({ params }: any) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Wait for params to resolve and unwrap it
    const fetchParams = async () => {
      if (params && params.userEmail) {
        const decodedEmail = decodeURIComponent(params.userEmail);
        setEmail(decodedEmail);
      }
    };

    fetchParams();
  }, [params]);

  // If `email` is not yet set, show loading message
  if (!email) {
    return <div>Loading...</div>;
  }

  const emailUrl = params.userEmail; // Still can access the raw value if necessary

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
          Importar un archivo externo
        </Button>
      </div>
      <p className="my-5">Diseños recientemente vistos</p>
      <CardDemo email={email} />
    </section>
  );
}
