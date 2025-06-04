import { z } from "zod";

export const userInputSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirm: z
      .string()
      .min(5, "Contraseña: Al menos 5 caracteres.")
      .regex(/[A-Z]/, "Contraseña: Al menos 1 letra en mayúscula.")
      .regex(/[a-z]/, "Contraseña: Al menos 1 letra en minúscula.")
      .regex(/[0-9]/, "Contraseña: Al menos 1 número.")
      .regex(/[\W_]/, "Contraseña: Al menos 1 caracter especial.")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.confirm) {
        return data.password === data.confirm;
      } else {
        return true;
      }
    },
    {
      message: "Confirmación: Los datos no coinciden",
      path: ["confirm"],
    }
  );
