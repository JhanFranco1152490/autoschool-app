import * as z from "zod";

const studentSchema = z.object({
  first_name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  email: z.email("Correo electrónico inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
});

const studentDefaultForm = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
}

export { studentSchema, studentDefaultForm }