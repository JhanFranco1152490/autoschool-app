import { studentDefaultForm, studentSchema } from "@/features/dashboard/students/students-schema";
import { studentsService } from "@/services/students.service";
import { useDashboard } from "./useDashboard";

function useStudent() {
    const {
        selectedData: selectedStudent,
        setSelectedData: setSelectedStudent,
        loadData: loadStudents,
        createData: createStudent,
        updateData: updateStudent,
        deleteData: deleteStudent,
        ...studentDashboard
    } = useDashboard({
        dashboardSchema: studentSchema,
        dashboardDefaultForm: studentDefaultForm,
        loadItems: async () => studentsService.getStudents(),
        loadError: () => "Error al cargar los estudiantes. Verifica la conexión con el servidor.",
        createItem: async (data) => studentsService.createStudent(data),
        createSuccess: "Estudiante creado exitosamente",
        createError: () => "Error al crear el estudiante. Es posible que el correo ya exista.",
        updateItem: async (id, data) => studentsService.updateStudent(id, data),
        updateSuccess: "Estudiante actualizado exitosamente",
        updateError: () => "Error al actualizar el estudiante",
        deleteItem: async (id) => studentsService.deleteStudent(id),
        deleteSuccess: "Estudiante eliminado exitosamente",
        deleteError: () => "Error al eliminar el estudiante",
    })

    const handlePictureSuccess = (updated) => {
        // TODO(actividad): actualizar el estado local para reflejar la nueva foto
        // Pista: reemplaza el estudiante actualizado dentro de `students` usando su id.
        console.log("TODO: actualizar listado con estudiante modificado", updated);
    };

    const getProfilePictureUrl = (profilePicture) => {
        if (!profilePicture) return null;
        if (profilePicture.startsWith("http://") || profilePicture.startsWith("https://")) {
            return profilePicture;
        }
        return `${BACKEND_ORIGIN}${profilePicture}`;
    };


    return (
        {
            selectedStudent,
            setSelectedStudent,
            loadStudents,
            createStudent,
            updateStudent,
            deleteStudent,
            handlePictureSuccess,
            getProfilePictureUrl,
            ...studentDashboard
        }
    )
}

export { useStudent };
