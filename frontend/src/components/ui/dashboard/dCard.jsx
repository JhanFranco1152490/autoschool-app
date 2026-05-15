import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card"

function DBCard({
    title,
    description,
    children,
    ...props
}){
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

export {DBCard}