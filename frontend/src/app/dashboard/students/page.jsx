"use client";

import { StudentsPageUI } from "@/components/dashboard/studentsDashboard";
import { StudentProvider } from "@/context/dashboard/StudentContext";

export default function StudentsPage() {
    
    return (
        <StudentProvider>
            <StudentsPageUI />
        </StudentProvider>
    )
}