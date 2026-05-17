"use client";

import { useContext, useEffect } from "react";

import { cn } from "@/lib/utils";

import { DBCardTable } from "@/components/dashboard/dbcard";
import { DBPage } from "@/components/dashboard/dbpage";
import { Form } from "@/components/form/form";
import { Dialog } from "@/components/ui/dialog";
import { CourseContext } from "@/context/dashboard/CourseContext";
import { getCourseColumns } from "@/features/dashboard/courses/courses-columns";
import { CoursesFormFields } from "@/features/dashboard/courses/courses-form-fields";

function CoursesPageUI() {

  let {
    selectedCourse,
    setSelectedCourse,
    updateModal,
    setDeleteModal,
    handleSubmit,
    isSubmitting,
    loadCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    displayFormModal,
    error,
    success,
  } = useContext(CourseContext)

  //Los metodos de las acciones se deben crear en este archivo para que puedan usar el contexto
  const courseColumns = getCourseColumns({
    onUpdate: (__, row) => {
      displayFormModal(true, row)
      setSelectedCourse(row)
    },
    onDelete: (__, row) => {
      setDeleteModal(true)
      setSelectedCourse(row)
    },
  })

  useEffect(() => {
    loadCourses();
  }, []);

  const formModalInfo = {
    false: {
      title: "Registrar nuevo",
      description: "Añade un nuevo curso al sistema.",
      onSubmit: createCourse
    },
    true: {
      title: "Editar curso",
      description: "Actualiza los datos del curso",
      onSubmit: updateCourse
    },
  }

  return (

    <DBPage
      title={"Cursos"}
      description={"Gestiona el registro de cursos."}
      form={(
        <Dialog className={cn(updateModal && "w-full max-w-lg")} variant="transparent" open={updateModal}>
          <Form
            title={formModalInfo[updateModal].title}
            description={formModalInfo[updateModal].description}
            cancelButton={updateModal}
            onCancel={() => displayFormModal(false)}
            submitButtonText={isSubmitting ? "Guardando" : "Guardar Curso"}
            onSubmit={handleSubmit(formModalInfo[updateModal].onSubmit)}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
          >
            <CoursesFormFields />
          </Form>
        </Dialog>
      )}
      table={(
        <DBCardTable
          title={"Listado de Cursos"}
          loadingMessage={"Cargando cursos..."}
          emptyTableMessage={"No hay cursos registrados."}
          tableColumns={courseColumns}
          onCancel={() => setDeleteModal(false)}
          onDelete={() => deleteCourse(selectedCourse.id)}
          dialogDeleteTitle={"Eliminar curso"}
          dialogDeleteMessage={<>
            ¿Seguro que deseas eliminar el curso "<span className="font-bold">{selectedCourse?.name}</span>" ?
          </>}
          context={CourseContext}
        />
      )}
    >
    </DBPage>
  );
}

export { CoursesPageUI };
