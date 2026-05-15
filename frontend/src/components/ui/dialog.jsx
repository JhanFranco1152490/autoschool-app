import { Button } from "./button"

function Dialog({
    title,
    message,
    className,
    children,
    variant,
    open = true,
    ...props
}) {

    const variants = {
        default: "w-full max-w-md rounded-xl bg-white p-6 shadow-lg",
        transparent: "",
    }

    if(!Object.keys(variants).includes(variant)) variant = "default"

    return (
        <div className={open ? "fixed inset-0 z-50 flex items-center justify-center bg-black/80" : ""}>

            <div className={`${variants[variant]} ${className}`} {...props}>
                {title && (
                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>
                )}

                {message && (
                    <p className="mt-2 text-gray-500">
                        {message}
                    </p>
                )}

                {children}
            </div>
        </div>
    )
}


function DialogDelete({
    title,
    message,
    className,
    cancelButtonText = "Cancelar",
    onCancel,
    deleteButtonText = "Eliminar",
    onDelete,
}) {
    return (
        <Dialog
            title={title}
            message={message}
            className={className}
        >
            <div className="mt-6 flex justify-end gap-3">
                <Button
                    type="button"
                    onClick={onCancel}
                >
                    {cancelButtonText}
                </Button>

                <Button
                    type="button"
                    variant="destructive"
                    onClick={onDelete}
                >
                    {deleteButtonText}
                </Button>
            </div>
        </Dialog>
    )
}

export { Dialog, DialogDelete }