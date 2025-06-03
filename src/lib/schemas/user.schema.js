import { z } from "zod";

export const userInputSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string(),
    confirm: z
      .string()
      .min(5, "La contraseña debe contener al menos 5 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos 1 letra en mayúscula"
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos 1 letra en minúscula"
      )
      .regex(/[0-9]/, "La contraseña debe contener al menos 1 número")
      .regex(
        /[\W_]/,
        "La contraseña debe contener al menos 1 caracter especial"
      )
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
      message: "La confirmación de contraseña no coincide",
      path: ["confirm"],
    }
  );
