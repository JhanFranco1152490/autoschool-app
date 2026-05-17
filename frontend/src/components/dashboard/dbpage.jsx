import { DBMain } from "./dbmain"

function DBPage({
    title,
    description,
    form,
    table,
}) {

    return (
        <DBMain
            title={title}
            description={description}
        >
            <div className="grid gap-6 md:grid-cols-3">

                <div className="md:col-span-1">
                    {form}
                </div>

                <div className="md:col-span-2">
                    {table}
                </div>

            </div>
        </DBMain>
    )
}

export { DBPage }