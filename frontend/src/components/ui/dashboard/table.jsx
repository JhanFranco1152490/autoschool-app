import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CircleX, Pencil } from "lucide-react";

function DBTable({
    columns,
    data,
    ...props
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.key} className={column.className}>{column.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={index}>
                        {columns.map((column) => (
                            <TableCell key={column.header}>
                                {column.render
                                    ? column.render(row[column.key], row)
                                    : row[column.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function DBTableActions({
    updateButton = "true",
    onUpdate,
    deleteButton = "true",
    onDelete,
    className,
    ...props
}) {
    return (
        <div className={`flex items-center gap-5 ${className}`}> 
            {updateButton && (
                <Pencil className="cursor-pointer text-muted-foreground hover:text-green-400" onClick={onUpdate} />
            )}
            {deleteButton && (
                <CircleX className="cursor-pointer text-muted-foreground hover:text-red-700" onClick={onDelete} />
            )}
        </div>
    )
}

export { DBTable, DBTableActions }