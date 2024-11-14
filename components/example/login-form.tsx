"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button, Link } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LogInFormDemo() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
    // Reemplaza caracteres especiales en el email para que sea una ruta segura
    const userEmail = encodeURIComponent(data.email);
    // Redirige al usuario a la página dinámica
    router.push(`/users/${userEmail}`);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Bienvenido a Fashion Station
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login a Fashion Station si puedes porque aún no tenemos una forma de
        ingresar.
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="text"
            {...register("email", { required: "El correo es requerido" })}
          />
          {errors.email && (
            <p role="alert" className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
          />
          {errors.password && (
            <p role="alert" className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </LabelInputContainer>
        <Button
          color="secondary"
          className="w-full"
          variant="shadow"
          type="submit"
        >
          Log in &rarr;
        </Button>
        <br />
        <br />
        ¿Aún no tienes una cuenta?&nbsp;
        <Link href="/signup" color="secondary">
          Sign up
        </Link>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
