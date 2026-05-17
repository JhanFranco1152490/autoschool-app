import { FormCheckBox, FormInput, FormSelect } from "@/components/form/form"

function DashboardFormFields({
    fields = [],
    register,
    errors,
}) {

    function renderField(field) {
        const commonProps = {
            label: field.label,
            id: field.id,
            error: errors[field.id],
            errorMessage: errors[field.id]?.message,
            ...register(field.id)
        }

        switch (field.type) {
            case "select":
                return (
                    < FormSelect
                        key={field.id}
                        {...commonProps}
                    >
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </FormSelect>
                )
            case "checkbox":
                return (
                    <div key={field.id} className="flex items-center gap-2">
                        <FormCheckBox {...commonProps} />
                    </div>
                )
            default:
                return <FormInput key={field.id} type={field.type} {...commonProps} />
        }
    }

    return (
        <>
            {fields.map(renderField)}
        </>
    )
}

export { DashboardFormFields }