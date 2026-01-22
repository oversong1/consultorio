import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';
import { useExams } from '../hooks/useExams'; // Hook importado
import type { AppointmentDTO, Appointment } from '../services/appointments';
import { ExamManager } from '../components/ExamManager';

export function Dashboard() {
  const { signOut, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  // Hook de exames fornecendo os dados e a função de busca
  const { exams, fetchExams } = useExams();

  const { 
    appointments, 
    loading, 
    fetchAppointments, 
    removeAppointment, 
    saveAppointment 
  } = useAppointments();

  const { register, handleSubmit, reset } = useForm<AppointmentDTO>();

  const todayMin = useMemo(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }, []);

  useEffect(() => {
    fetchAppointments();
    fetchExams(); // Agora usa a função do hook
  }, [fetchAppointments, fetchExams]);

  function handleEditClick(appointment: Appointment) {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
    
    reset({
      appointment_date: new Date(appointment.appointment_date).toISOString().slice(0, 16),
      exam_id: appointment.exam_id,
      observations: appointment.observations || ''
    });
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingAppointment(null);
    reset({
      appointment_date: '',
      exam_id: '',
      observations: ''
    });
  }

const handleSave = async (data: AppointmentDTO) => {
  // 1. VERIFICAÇÃO DE CONFLITO:
  // Procuramos na lista atual se existe algum agendamento (diferente do que estamos editando)
  // que tenha a mesma data e hora exata.
  const hasConflict = appointments.some(app => {
    const isSameDate = new Date(app.appointment_date).getTime() === new Date(data.appointment_date).getTime();
    const isNotSameAppointment = app.id !== editingAppointment?.id;
    return isSameDate && isNotSameAppointment;
  });

  if (hasConflict) {
    alert('⚠️ Este horário já está ocupado por outro agendamento!');
    return; // Interrompe a função aqui e não salva
  }

  // 2. FLUXO NORMAL DE SALVAMENTO:
  try {
    const id = editingAppointment?.id;

    if (id) {
      await saveAppointment(data, id);
    } else {
      await saveAppointment(data);
    }

    handleCloseModal(); 
    alert('Salvo com sucesso!');
  } catch (err: unknown) {
    console.error("Erro ao salvar:", err);
    let errorMessage = "Erro ao processar requisição.";
    
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as { response: { data: { error?: string, message?: string } } };
      errorMessage = axiosError.response.data.error || axiosError.response.data.message || errorMessage;
    }
    
    alert(`Erro: ${errorMessage}`);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">Consultório</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden sm:inline">Olá, <strong>{user?.name}</strong></span>
            <button onClick={signOut} className="text-sm bg-red-50 text-red-600 px-4 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Meus Agendamentos</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsExamModalOpen(true)}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-lg hover:bg-gray-900 transition-all shadow-md font-semibold text-sm"
          >
            ⚙️ Tipos de Exames
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md font-semibold text-sm"
          >
            + Novo Agendamento
          </button>
        </div>
      </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
            <p>Carregando dados...</p>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Data e Hora</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Exame / Especialidade</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Observações</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => {
                    const exam = exams.find(e => e.id === appointment.exam_id);
                    // LOGICA PARA STATUS: Verifica se a data do agendamento é menor que agora
                    const isPast = new Date(appointment.appointment_date) < new Date();
                    return (
                      <tr 
                        key={appointment.id} 
                        className={`transition-colors ${isPast ? 'bg-gray-50 opacity-60' : 'hover:bg-blue-50/30'}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          <div className="flex flex-col">
                            {new Date(appointment.appointment_date).toLocaleString('pt-BR')}
                            {/* Badge de Status */}
                            {isPast ? (
                              <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">● Concluído</span>
                            ) : (
                              <span className="text-[10px] font-bold text-green-500 uppercase mt-1">● Agendado</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex flex-col">
                            <span className={`font-medium ${isPast ? 'text-gray-500' : 'text-gray-800'}`}>
                              {exam?.name || 'Exame não encontrado'}
                            </span>
                            <span className="text-xs text-gray-400">{exam?.specialty}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 italic">
                          {appointment.observations || 'Nenhuma observação'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          {/* Se o exame passou, podemos esconder o botão editar ou mantê-lo */}
                          {!isPast && (
                            <button 
                              onClick={() => handleEditClick(appointment)}
                              className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 transition-all"
                            >
                              Editar
                            </button>
                          )}
                          <button 
                            onClick={() => {
                                if(window.confirm("Deseja realmente cancelar?")) 
                                    removeAppointment(appointment.id)
                            }}
                            className="text-red-500 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-all"
                          >
                            {isPast ? 'Remover Histórico' : 'Cancelar'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No final do JSX */}
        <ExamManager 
          isOpen={isExamModalOpen} 
          onClose={() => {
            setIsExamModalOpen(false);
            fetchExams(); // <--- Isso aqui no Dashboard mata o problema do F5
          }} 
        />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseModal} />
            <div className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
              </h3>
              <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Data e Horário</label>
                  <input type="datetime-local" {...register('appointment_date')} min={todayMin} required className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Exame Disponível</label>
                  <select {...register('exam_id')} required className="w-full border border-gray-300 rounded-xl p-3 outline-none bg-white">
                    <option value="">Selecione o procedimento...</option>
                    {exams.map(exam => (
                      <option key={exam.id} value={exam.id}>{exam.name} ({exam.specialty})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Observações Adicionais</label>
                  <textarea {...register('observations')} className="w-full border border-gray-300 rounded-xl p-3 outline-none" rows={3} />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={handleCloseModal} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Cancelar</button>
                  <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg active:scale-95 transition-all">
                    {editingAppointment ? 'Salvar Alterações' : 'Confirmar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}