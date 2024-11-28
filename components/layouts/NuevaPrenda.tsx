"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Importamos useEffect y useState

const FormSchema = z.object({
  type: z.enum(["playera", "pantalon", "hoddie"], {
    required_error: "Necesitas seleccionar una prenda.",
  }),
});

export function AlertDialogDemo(email: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [isClient, setIsClient] = useState(false); // Estado para controlar si estamos en el cliente
  const router = useRouter(); // Usamos useRouter

  // Aseguramos que useRouter solo se utilice en el cliente
  useEffect(() => {
    setIsClient(true); // Indicamos que el componente se ha montado en el cliente
  }, []);

  // Función de submit con redirección
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(JSON.stringify(data, null, 2));
    // Redirigimos solo si estamos en el cliente
    if (isClient && email.email) {
      router.push(`/users/${email.email}/new?type=${data.type}`);
    } else {
      console.error(
        "No se ha encontrado el correo del usuario o no estamos en el cliente."
      );
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="flat" color="secondary">
          Crear prenda
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nueva prenda</AlertDialogTitle>
          <AlertDialogDescription>
            En Fashion Station puedes crear varios tipos de prendas según tus
            necesidades, escoge alguna para poder comenzar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="playera" />
                        </FormControl>
                        <FormLabel className="font-normal">Playera</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pantalon" />
                        </FormControl>
                        <FormLabel className="font-normal">Pantalon</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="hoddie" />
                        </FormControl>
                        <FormLabel className="font-normal">Hoddie</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-4 items-center">
              <Button type="submit" color="secondary" variant="flat">
                Crear
              </Button>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
