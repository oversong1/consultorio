import { useState, useCallback } from 'react';
import { appointmentService } from '../services/appointments';
import type { Appointment, AppointmentDTO } from '../services/appointments';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await appointmentService.getAll();
      setAppointments(response.data);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAppointment = async (id: string) => {
    if (!window.confirm("Deseja realmente excluir este agendamento?")) return;
    try {
      await appointmentService.delete(id);
      await fetchAppointments();
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

const saveAppointment = async (data: AppointmentDTO, id?: string) => {
  try {
    if (id) {
      // Forçamos o retorno da chamada de update
      await appointmentService.update(id, data);
    } else {
      await appointmentService.create(data);
    }
    // SÓ recarrega se a API responder com sucesso
    await fetchAppointments();
  } catch (err) {
    console.error("Erro na operação de salvar:", err);
    throw err; // Repassa para o Dashboard exibir o alert
  }
};

  return { appointments, loading, fetchAppointments, removeAppointment, saveAppointment };
}