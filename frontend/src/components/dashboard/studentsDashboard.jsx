"use client";

import { useContext, useEffect } from "react";

import { cn } from "@/lib/utils";

import { DBCardTable } from "@/components/dashboard/dbcard";
import { DBPage } from "@/components/dashboard/dbpage";
import { Form } from "@/components/form/form";
import { Dialog } from "@/components/ui/dialog";
import { StudentContext } from "@/context/dashboard/StudentContext";
import { StudentsFormFields } from "@/features/dashboard/students/students-form-fields";
import { getStudentColumns } from "@/features/dashboard/students/students-columns";

function StudentsPageUI() {

  let {
    selectedStudent,
    setSelectedStudent,
    updateModal,
    setDeleteModal,
    handleSubmit,
    isSubmitting,
    loadStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    displayFormModal,
    error,
    success
  } = useContext(StudentContext)

  //Los metodos de las acciones se deben crear en este archivo para que puedan usar el contexto
  const studentColumns = getStudentColumns({
    onUpdate: (__, row) => {
      displayFormModal(true, row)
      setSelectedStudent(row)
    },
    onDelete: (__, row) => {
      setDeleteModal(true)
      setSelectedStudent(row)
    },
  })

  useEffect(() => {
    loadStudents();
  }, []);

  const formModalInfo = {
    false: {
      title: "Registrar nuevo",
      description: "Añade un nuevo estudiante al sistema.",
      onSubmit: createStudent
    },
    true: {
      title: "Editar estudiante",
      description: "Actualiza los datos del estudiante",
      onSubmit: updateStudent
    },
  }

  return (
    <DBPage
      title={"Estudiantes"}
      description={"Gestiona el registro de estudiantes."}
      form={(
        <Dialog className={cn(updateModal && "w-full max-w-lg")} variant="transparent" open={updateModal}>
          <Form
            title={formModalInfo[updateModal].title}
            description={formModalInfo[updateModal].description}
            cancelButton={updateModal}
            onCancel={() => displayFormModal(false)}
            submitButtonText={isSubmitting ? "Guardando" : "Guardar Estudiante"}
            onSubmit={handleSubmit(formModalInfo[updateModal].onSubmit)}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
          >
            <StudentsFormFields />
          </Form>
        </Dialog>
      )}
      table={(
        <DBCardTable
          title={"Listado de Estudiantes"}
          loadingMessage={"Cargando estudiantes..."}
          emptyTableMessage={"No hay estudiantes registrados."}
          tableColumns={studentColumns}
          onCancel={() => setDeleteModal(false)}
          onDelete={() => deleteStudent(selectedStudent.id)}
          dialogDeleteTitle={"Eliminar estudiante"}
          dialogDeleteMessage={<>
            ¿Seguro que deseas eliminar el estudiante "<span className="font-bold">{selectedStudent?.first_name} {selectedStudent?.last_name}</span>" ?
          </>}
          context={StudentContext}
        />
      )}
    >
    </DBPage>
  );
}

export { StudentsPageUI };
