"use client";

import { DBTableActions } from "@/components/data-display/table"

function getStudentColumns({
    actions,
    utils,
}) {
    return (
        [
            {
                key: "photo",
                header: "Foto",
                className: "w-12",
                render: (value, row) => (
                    <>
                        {row.profile_picture ? (
                            <img
                                src={utils.getProfilePictureUrl(value, row)}
                                alt={`${row.first_name} ${row.last_name}`}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-medium">
                                {row.first_name[0]}{row.last_name[0]}
                            </div>
                        )}
                    </>
                ),
            },
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
                        photoButton={true}
                        onPhoto={() => actions.onPhoto(value, row)} 
                        onUpdate={() => actions.onUpdate(value, row)}
                        onDelete={() => actions.onDelete(value, row)}
                    />
                )
            }
        ]
    )
}

export { getStudentColumns }