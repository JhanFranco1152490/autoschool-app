import { CourseContext } from "@/context/dashboard/CourseContext";
import { useContext } from "react";
import { DashboardFormFields } from "../../../components/dashboard/dbFormFields";

function CoursesFormFields({ }) {
    const {
        register,
        errors,
    } = useContext(CourseContext)

    const fields = [
        {
            label: "Nombre",
            id: "name"
        },
        {
            label: "Descripción",
            id: "description"
        },
        {
            label: "Duración (Horas)",
            id: "duration_hours",
            type: "number"
        },
        {
            label: "Precio",
            id: "price",
            type: "number"
        },
        {
            label: "Nivel",
            id: "level",
            type: "select",
            options: [
                {
                    label: "Basic",
                    value: "basic"
                },
                {
                    label: "Intermediate",
                    value: "intermediate"
                },
                {
                    label: "Advanced",
                    value: "advanced"
                },
            ]
        },
        {
            label: "Activo",
            id: "is_active",
            type: "checkbox"
        },
    ]


    return (
        <DashboardFormFields
            fields={fields}
            register={register}
            errors={errors}
        />
    )
}

export { CoursesFormFields };