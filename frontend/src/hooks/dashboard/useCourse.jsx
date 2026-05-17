import { courseDefaultForm, courseSchema } from "@/features/dashboard/courses/courses-schema";
import { coursesService } from "@/services/courses.service";
import { useDashboard } from "./useDashboard";

function useCourse() {
    const {
        selectedData: selectedCourse,
        setSelectedData: setSelectedCourse,
        loadData: loadCourses,
        createData: createCourse,
        updateData: updateCourse,
        deleteData: deleteCourse,
        ...courseDashboard
    } = useDashboard({
        dashboardSchema: courseSchema,
        dashboardDefaultForm: courseDefaultForm,
        loadItems: async () => coursesService.getCourses(),
        loadError: () => "Error al cargar los cursos. Verifica la conexión con el servidor.",
        createItem: async (data) => coursesService.createCourse(data),
        createSuccess: "Curso creado exitosamente",
        createError: () => "Error al crear el curso.",
        updateItem: async (id, data) => coursesService.updateCourse(id, data),
        updateSuccess: "Curso actualizado exitosamente",
        updateError: () => "Error al actualizar el curso",
        deleteItem: async (id) => coursesService.deleteCourse(id),
        deleteSuccess: "Curso eliminado exitosamente",
        deleteError: () => "Error al eliminar el curso",
    })
    return (
        {
            selectedCourse,
            setSelectedCourse,
            loadCourses,
            createCourse,
            updateCourse,
            deleteCourse,
            ...courseDashboard
        }
    )
}

export { useCourse };
