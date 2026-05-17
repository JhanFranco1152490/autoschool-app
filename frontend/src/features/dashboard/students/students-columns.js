"use client";

import { DBTableActions } from "@/components/data-display/table"

function getStudentColumns({
    onUpdate,
    onDelete,
}) {
    return (
        [
            {
                key: "name",
                header: "Nombre",
                render: (value, row) => (
                    <span className="font-medium">{row.first_name} {row.last_name}</span>
                )
            },
            {
                key: "email",
                header: "Email",
            },
            {
                key: "phone",
                header: "Teléfono",
            },
            {
                key: "created_at",
                header: "Fecha Registro",
                render: (value) => (
                    new Date(value).toLocaleDateString()
                )
            },
            {
                key: "ACTIONS",
                header: "",
                className: "px-0",
                render: (value, row) => (
                    <DBTableActions
                        onUpdate={() => onUpdate(value, row)}
                        onDelete={() => onDelete(value, row)}
                    />
                )
            }
        ]
    )
}

export { getStudentColumns }