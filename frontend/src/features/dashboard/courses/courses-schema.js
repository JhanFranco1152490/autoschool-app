import * as z from "zod";

const courseSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
    duration_hours: z.coerce.number().min(1, "La duracion debe ser minimo 1"),
    price: z.coerce.number().min(0, "El precio no puede ser negativo"),
    level: z.string().min(1, "El nivel es requerido"),
    is_active: z.boolean(),
});

const courseDefaultForm = {
    name: "",
    description: "",
    duration_hours: "",
    price: "",
    level: "basic",
    is_active: false
}

export { courseSchema, courseDefaultForm }