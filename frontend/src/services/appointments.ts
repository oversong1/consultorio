import api from './api';

// Exportando como interface para ser usada como tipo
export interface AppointmentDTO {
  appointment_date: string;
  exam_id: string;
  observations: string;
}

// Mantendo a interface do agendamento que vem do banco
export interface Appointment extends AppointmentDTO {
  id: string;
  user_id: string;
}

export const appointmentService = {
  getAll: () => api.get<Appointment[]>('/appointments'),
  create: (data: AppointmentDTO) => api.post('/appointments', data),
//   update: (id: string, data: AppointmentDTO) => api.put(`/appointments/${id}`, data),
//   update: (id: string, data: AppointmentDTO) => api.put('/appointments', { ...data, id }),
  update: (id: string, data: AppointmentDTO) => api.put(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};