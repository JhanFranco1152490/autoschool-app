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
  }
};
