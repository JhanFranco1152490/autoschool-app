function DBMain({
    title,
    description,
    className,
    children,
    ...props
}) {
    return (
        <div className={`space-y-6 ${className}`} {...props}>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-gray-500 mt-2">{description}</p>
            </div>
            {children}
        </div>
    )
}

export { DBMain }