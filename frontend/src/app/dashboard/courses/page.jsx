"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { coursesService } from "@/services/courses.service";

import { Form, FormCheckBox, FormInput, FormSelect } from "@/components/ui/dashboard/form"
import { DBCard } from "@/components/ui/dashboard/dCard";
import { DBMain } from "@/components/ui/dashboard/dMain";
import { DBTable, DBTableActions } from "@/components/ui/dashboard/table";
import { DialogDelete } from "@/components/ui/dialog";

const courseSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  duration_hours: z.coerce.number().min(1, "La duracion debe ser minimo 1"),
  price: z.coerce.number().min(0, "El precio no puede ser negativo"),
  level: z.string().min(1, "El nivel es requerido"),
  is_active: z.boolean(),
});

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
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
    resolver: zodResolver(courseSchema),
  });

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const data = await coursesService.getCourses();
      setCourses(data);
    } catch (err) {
      setError("Error al cargar los cursos. Verifica la conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");
      await coursesService.createCourse(data);
      setSuccess("Curso creado exitosamente");
      reset();
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.detail || "Error al crear el curso");
    }
  };

  const deleteCourse = async (id) => {
    try {
      setError("");
      setSuccess("");
      await coursesService.deleteCourse(id);
      setSuccess("Curso eliminado exitosamente");
      reset();
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.detail || "Error al eliminar el curso");
    }
  }

  return (
    <DBMain
      title="Cursos"
      description="Gestiona el registro de cursos."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Form
            title="Registrar nuevo"
            description="Añade un nuevo curso al sistema."
            cancelButton={true}
            onCancel={() => reset()}
            submitButtonText={isSubmitting ? "Guardando" : "Guardar Curso"}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
          >
            <FormInput
              label="Nombre"
              id="name"
              error={errors.name}
              errorMessage={errors.name?.message}
              {...register("name")}
            />
            <FormInput
              label="Descripción"
              id="description"
              error={errors.description}
              errorMessage={errors.description?.message}
              {...register("description")}
            />
            <FormInput
              label="Duración (Horas)"
              id="duration_hours"
              type="number"
              error={errors.duration_hours}
              errorMessage={errors.duration_hours?.message}
              {...register("duration_hours", {
                valueAsNumber: true
              })}
            />
            <FormInput
              label="Precio"
              id="price"
              type="number"
              error={errors.price}
              errorMessage={errors.price?.message}
              {...register("price", {
                valueAsNumber: true
              })}
            />
            <FormSelect
              label="Nivel"
              id="level"
              type="number"
              error={errors.level}
              errorMessage={errors.level?.message}
              defaultValue="basic"
              {...register("level")}
            >
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </FormSelect>
            <div className="flex items-center gap-2">
              <FormCheckBox
                label="Activo"
                id="is_active"
                error={errors.is_active}
                errorMessage={errors.is_active?.message}
                {...register("is_active")}
              />
            </div>
          </Form>
        </div>

        <div className="md:col-span-2">
          <DBCard title="Listado de Cursos">
            {isLoading ? (
              <p className="text-center text-gray-500 py-4">Cargando cursos...</p>
            ) : courses.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No hay cursos registrados.</p>
            ) : (
              <div className="rounded-md border">
                <DBTable
                  columns={
                    [
                      {
                        key: "name",
                        header: "Nombre",
                        render: (value) => (
                          <span className="font-medium">{value}</span>
                        )
                      },
                      {
                        key: "description",
                        header: "Descripcion",
                      },
                      {
                        key: "duration_hours",
                        header: "Duración",
                      },
                      {
                        key: "price",
                        header: "Precio",
                      },
                      {
                        key: "level",
                        header: "Nivel",
                      },
                      {
                        key: "is_active",
                        header: "Activo",
                        render: (value) => (
                          <input type="checkbox" disabled={true} checked={value} />
                        )
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
                              setSelectedCourse(row)
                            }}
                          />
                        )
                      }
                    ]
                  }

                  data={courses}
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
            ¿Seguro que deseas eliminar el curso "<span className="font-bold">{selectedCourse.name}</span>" ?
          </>}
          onCancel={() => setDeleteModal(false)}
          onDelete={() => {
            deleteCourse(selectedCourse.id)
            setDeleteModal(false)
          }}
        />
      )}
    </DBMain>
  );
}
