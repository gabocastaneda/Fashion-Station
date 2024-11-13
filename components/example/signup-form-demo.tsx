"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button, Checkbox, Link } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignupFormInputs {
  name: string;
  lastname: string;
  email: string;
  password: string;
  termsnconditions: boolean;
}

export default function SignupFormDemo() {
  const [isSelected, setIsSelected] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    console.log(data);
    const userEmail = encodeURIComponent(data.name);
    router.push(`/users/${userEmail}`);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Bienvenido a Fashion Studio
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up a Fashion Studio si puedes porque aún no tenemos una forma de
        ingresar.
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Nombre</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              {...register("name", {
                required: "El nombre es requerido",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Solo se permiten letras",
                },
              })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p role="alert" className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              {...register("lastname", {
                required: "El apellido es requerido",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Solo se permiten letras",
                },
              })}
            />
            {errors.lastname && (
              <p role="alert" className="text-sm text-red-500">
                {errors.lastname.message}
              </p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
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
        <Checkbox
          color="secondary"
          isSelected={isSelected}
          onValueChange={setIsSelected}
          {...register("termsnconditions", {
            required: "Debes de aceptar los términos y condiciones",
          })}
        >
          Acepto los términos y condiciones
        </Checkbox>
        {errors.termsnconditions && (
          <p role="alert" className="text-sm text-red-500">
            {errors.termsnconditions.message}
          </p>
        )}
        <br />
        <br />
        <Button
          color="secondary"
          className="w-full"
          variant="shadow"
          type="submit"
        >
          Sign up &rarr;
        </Button>
        <br />
        <br />
        ¿Ya tienes una cuenta?&nbsp;
        <Link href="/login" color="secondary">
          Log in
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
