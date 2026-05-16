"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { studentsService } from "@/services/students.service";

import { Form, FormInput } from "@/components/form/form";
import { DBCard } from "@/components/dashboard/dbcard";
import { DBMain } from "@/components/dashboard/dbmain";
import { DBTable, DBTableActions } from "@/components/data-display/table";
import { DialogDelete } from "@/components/ui";

const studentSchema = z.object({
  first_name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  email: z.email("Correo electrónico inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
});

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const data = await studentsService.getStudents();
      setStudents(data);
    } catch (err) {
      setError("Error al cargar los estudiantes. Verifica la conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");
      await studentsService.createStudent(data);
      setSuccess("Estudiante creado exitosamente");
      reset();
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.detail || "Error al crear el estudiante. Es posible que el correo ya exista.");
    }
  };

  return (
    <DBMain
      title="Estudiantes"
      description="Gestiona el registro de estudiantes."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Form
            title="Registrar nuevo"
            description="Añade un nuevo estudiante al sistema."
            cancelButton={false}
            onCancel={() => reset()}
            submitButtonText={isSubmitting ? "Guardando" : "Guardar Estudiante"}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
          >
            <FormInput
              label="Nombre"
              id="first_name"
              error={errors.first_name}
              errorMessage={errors.first_name?.message}
              {...register("first_name")}
            />
            <FormInput
              label="Apellido"
              id="last_name"
              error={errors.last_name}
              errorMessage={errors.last_name?.message}
              {...register("last_name")}
            />
            <FormInput
              label="Correo electrónico"
              id="email"
              type="email"
              error={errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
            />
            <FormInput
              label="Teléfono"
              id="phone"
              error={errors.phone}
              errorMessage={errors.phone?.message}
              {...register("phone")}
            />
          </Form>
        </div>

        <div className="md:col-span-2">
          <DBCard title="Listado de Estudiantes">
            {isLoading ? (
              <p className="text-center text-gray-500 py-4">Cargando estudiantes...</p>
            ) : students.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No hay estudiantes registrados.</p>
            ) : (
              <div className="rounded-md border">
                <DBTable
                  columns={
                    [
                      {
                        key: "name",
                        header: "Nombre",
                        render: (value, row) => (
                          <span className="font-medium">{row.first_name} {row.last_name}</span>
                        )
                      },
                      {
                        key: "email",
                        header: "Email",
                      },
                      {
                        key: "phone",
                        header: "Teléfono",
                      },
                      {
                        key: "created_at",
                        header: "Fecha Registro",
                        render: (value) => (
                          new Date(value).toLocaleDateString()
                        )
                      },
                      {
                        key: "ACTIONS",
                        header: "",
                        className: "px-0",
                        render: (value, row) => (
                          <DBTableActions
                            onUpdate={() => console.log(row.id, row)}
                            onDelete={() => {
                              setDeleteModal(true)
                              setSelectedStudent(row)
                            }}
                          />
                        )
                      }
                    ]
                  }

                  data={students}
                />
              </div>
            )}
          </DBCard>
        </div>
      </div>

      {deleteModal && (
        <DialogDelete
          title={"Eliminar curso"}
          message={<>
            ¿Seguro que deseas eliminar al estudiante "<span className="font-bold">{selectedStudent.first_name} {selectedStudent.last_name}</span>" ?
          </>}
          onCancel={() => setDeleteModal(false)}
          onDelete={() => {
            console.log(selectedStudent.id)
            setDeleteModal(false)
          }}
        />
      )}
    </DBMain>
  );
}
