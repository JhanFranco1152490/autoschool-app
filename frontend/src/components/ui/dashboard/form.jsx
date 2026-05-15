import * as React from "react"
import { Alert, AlertTitle, AlertDescription } from "../alert"
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "../select";

import { cn } from "@/lib/utils"
import { DBCard } from "./dCard";

function Form({
    className,
    type,
    title,
    description,
    cancelButton,
    cancelButtonText = "Cancelar",
    onCancel,
    submitButton = true,
    submitButtonText = "Enviar",
    onSubmit,
    isSubmitting,
    error,
    success,
    children,
    ...props
}) {

    return (
        <DBCard
            title={title}
            description={description}
        >
            <form onSubmit={onSubmit} className="space-y-4">
                
                {children}

                <div className="flex gap-4 justify-around">
                    {cancelButton && (
                        <Button className="grow" type="button" onClick={onCancel} disabled={isSubmitting}>
                            {cancelButtonText}
                        </Button>
                    )}

                    {submitButton && (
                        <Button type="submit" className="grow" disabled={isSubmitting}>
                            {submitButtonText}
                        </Button>
                    )}
                </div>
            </form>

            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="mt-4 border-green-500 text-green-700">
                    <CheckCircle2 className="h-4 w-4" color="green" />
                    <AlertTitle>Éxito</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}
        </DBCard>
    );
}


function FormInput({
    type = 'text',
    label,
    id,
    error,
    errorMessage,
    ...props
}) {
    if (!errorMessage) errorMessage = error

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} {...props} />
            <FormInputError error={error} errorMessage={errorMessage} />
        </div>
    )
}

function FormSelect({
    label,
    id,
    error,
    errorMessage,
    children,
    ...props
}) {
    if (!errorMessage) errorMessage = error

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Select id={id} {...props}>
                {children}
            </Select>
            {error && (
                <p className="text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    )
}

function FormCheckBox({
    label,
    id,
    error,
    errorMessage,
    ...props
}) {
    return (
        <>
            <Input id={id} type="checkbox" {...props} />
            <Label htmlFor={id}>{label}</Label>
            <FormInputError error={error} errorMessage={errorMessage} />
        </>
    )
}

function FormInputError({
    error,
    errorMessage,
}) {
    if (!error) return

    return (
        <p className="text-sm text-red-500">{errorMessage}</p>
    )
}


export { Form, FormInput, FormSelect, FormCheckBox }
