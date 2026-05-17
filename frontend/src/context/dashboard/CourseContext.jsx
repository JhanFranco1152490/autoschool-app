import React from "react"

import { useCourse } from "@/hooks/dashboard/useCourse"

const CourseContext = React.createContext()

function CourseProvider({children}){

    const course = useCourse()

    return(
        <CourseContext.Provider value={course}>
            {children}
        </CourseContext.Provider>
    )
}

export { CourseContext, CourseProvider}