"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { coursesService } from "@/services/courses.service";
import { Pencil, CircleX } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const courseSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  duration_hours: z.number().min(1, "La duracion debe ser minimo 1"),
  price: z.number().min(0, "El precio no puede ser negativo"),
  level: z.string().min(1, "El nivel es requerido"),
  is_active: z.boolean(),
});

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
        <p className="text-gray-500 mt-2">Gestiona el registro de cursos.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Registrar nuevo</CardTitle>
              <CardDescription>Añade un nuevo curso al sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input id="description" {...register("description")} />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration_hours">Duración (Horas)</Label>
                  <Input id="duration_hours" type="number" {...register("duration_hours", {
                    valueAsNumber: true
                  })} />
                  {errors.duration_hours && (
                    <p className="text-sm text-red-500">{errors.duration_hours.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" type="number" {...register("price", {
                    valueAsNumber: true
                  })} />
                  {errors.price && (
                    <p className="text-sm text-red-500">{errors.price.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Nivel</Label>
                  <Select defaultValue="Basic" {...register("level")}>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Select>
                  {errors.level && (
                    <p className="text-sm text-red-500">{errors.level.message}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input id="is_active" type="checkbox" {...register("is_active")} />
                  <Label htmlFor="is_active">Activo</Label>
                  {errors.is_active && (
                    <p className="text-sm text-red-500">{errors.is_active.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Curso"}
                </Button>
              </form>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mt-4 border-green-500 text-green-700">
                  <CheckCircle2 className="h-4 w-4" color="green" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-gray-500 py-4">Cargando cursos...</p>
              ) : courses.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No hay cursos registrados.</p>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Duración (Horas)</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Nivel</TableHead>
                        <TableHead>Activo</TableHead>
                        <TableHead>Fecha Registro</TableHead>
                        <TableHead className="px-0"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">
                            {course.name}
                          </TableCell>
                          <TableCell>{course.description}</TableCell>
                          <TableCell>{course.duration_hours}</TableCell>
                          <TableCell>{course.price}</TableCell>
                          <TableCell>{course.level}</TableCell>
                          <TableCell>
                            <input type="checkbox" disabled={true} checked={course.is_active} />
                          </TableCell>
                          <TableCell>
                            {new Date(course.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="flex items-center gap-5">
                            <Pencil className="cursor-pointer text-muted-foreground hover:text-green-400" onClick={(e) => console.log(course.id, course)} />
                            <CircleX className="cursor-pointer text-muted-foreground hover:text-red-700" onClick={() => deleteCourse(course.id)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
