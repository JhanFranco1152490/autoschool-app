import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { useContext } from "react"
import { DBTable } from "../data-display/table"
import { DialogDelete } from "../ui"

function DBCard({
    title,
    description,
    children,
    ...props
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

function DBCardTable({
    title = "Tabla",
    loadingMessage = "Cargando",
    emptyTableMessage = "No hay datos",
    tableColumns,
    onCancel,
    onDelete,
    dialogDeleteTitle = "Eliminar",
    dialogDeleteMessage = "¿Estas seguro que quieres eliminar este dato?",
    context,
}) {
    let {
        isLoading,
        deleteModal = false,
        dashboardData,
    } = useContext(context)

    return (
        <DBCard title={title}>
            {isLoading ? (
                <p className="text-center text-gray-500 py-4">{loadingMessage}</p>
            ) : !dashboardData?.length ? (
                <p className="text-center text-gray-500 py-4">{emptyTableMessage}</p>
            ) : (
                <div className="rounded-md border">
                    <DBTable
                        columns={tableColumns}
                        data={dashboardData}
                    />
                </div>
            )}

            {deleteModal && (
                <DialogDelete
                    title={dialogDeleteTitle}
                    message={dialogDeleteMessage}
                    onCancel={onCancel}
                    onDelete={onDelete}
                />
            )}
        </DBCard>
    )
}

export { DBCard, DBCardTable }