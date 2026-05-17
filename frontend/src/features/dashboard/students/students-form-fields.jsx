import { StudentContext } from "@/context/dashboard/StudentContext";
import { useContext } from "react";
import { DashboardFormFields } from "../../../components/dashboard/dbFormFields";

function StudentsFormFields({ }) {
    const {
        register,
        errors,
    } = useContext(StudentContext)

    const fields = [
        {
            label: "Nombre",
            id: "first_name"
        },
        {
            label: "Apellido",
            id: "last_name"
        },
        {
            label: "Correo electrónico",
            id: "email",
            type: "email"
        },
        {
            label: "Teléfono",
            id: "phone"
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

export { StudentsFormFields };
