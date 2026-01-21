import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

// 1. Interface ajustada conforme o seu DESCRIBE do MySQL
interface Appointment {
  id: string;
  appointment_date: string; // Nome exato do banco
  observations: string | null;
  exam_id: string;
  user_id: string;
}

export function Dashboard() {
  const { signOut, user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Consultório</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Olá, <strong>{user?.name}</strong></span>
            <button 
              onClick={signOut}
              className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Meus Agendamentos</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Novo Agendamento
          </button>
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-500">Buscando dados no servidor...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID do Exame</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observações</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {new Date(appointment.appointment_date).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.exam_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {appointment.observations || <span className="italic text-gray-400">Sem observações</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900">Cancelar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {appointments.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                Nenhum agendamento encontrado para este usuário.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}