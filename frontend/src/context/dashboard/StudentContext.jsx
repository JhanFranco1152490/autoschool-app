import { useStudent } from "@/hooks/dashboard/useStudent"
import React from "react"

const StudentContext = React.createContext()

function StudentProvider({children}){

    const student = useStudent()

    return(
        <StudentContext.Provider value={student}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentContext, StudentProvider}