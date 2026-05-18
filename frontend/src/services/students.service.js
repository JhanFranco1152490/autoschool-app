import { api } from '@/lib/api';

export const studentsService = {
  getStudents: async () => {
    const response = await api.get('/students/');
    return response.data.results || response.data;
  },

  createStudent: async (data) => {
    const response = await api.post('/students/', data);
    return response.data;
  },

  updateStudent: async (id, data) => {
    const response = await api.patch(`/students/${id}/`, data)
    return response.data
  },

  deleteStudent: async (id) => {
    const response = await api.delete(`/students/${id}/`)
    return response.data;
  },

  uploadPicture: async (studentId, file) => {
    if (!studentId || !file) {
      throw new Error('Faltan datos para subir la imagen.');
    }

    const formData = new FormData();

    // TODO(actividad): Agregar el archivo en FormData con la clave correcta
    // Ejemplo esperado: formData.append('profile_picture', file)

    // TODO(actividad): Consumir el action endpoint del backend
    // Endpoint esperado: /students/:id/upload-picture/
    // Debes enviar multipart/form-data y retornar response.data

    throw new Error('TODO_ACTIVIDAD: Implementa uploadPicture en students.service.js');
  },
};
