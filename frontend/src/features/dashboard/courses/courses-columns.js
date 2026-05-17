"use client";

import { DBTableActions } from "@/components/data-display/table"

function getCourseColumns({
    onUpdate,
    onDelete,
}) {
    return (
        [
            {
                key: "name",
                header: "Nombre",
                render: (value) => (
                    <span className="font-medium">{value}</span>
                )
            },
            {
                key: "description",
                header: "Descripcion",
            },
            {
                key: "duration_hours",
                header: "Duración",
            },
            {
                key: "price",
                header: "Precio",
            },
            {
                key: "level",
                header: "Nivel",
            },
            {
                key: "is_active",
                header: "Activo",
                render: (value) => (
                    <input type="checkbox" disabled={true} checked={value} />
                )
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

export { getCourseColumns }