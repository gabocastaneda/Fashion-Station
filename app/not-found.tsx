"use client";
import { Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link href={"/"} color="secondary">
        Volver
      </Link>
    </section>
  );
}
