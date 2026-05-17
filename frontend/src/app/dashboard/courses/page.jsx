"use client";

import { CoursesPageUI } from "@/components/dashboard/coursesDashboard";
import { CourseProvider } from "@/context/dashboard/CourseContext";

export default function CoursesPage() {
    
    return (
        <CourseProvider>
            <CoursesPageUI />
        </CourseProvider>
    )
}