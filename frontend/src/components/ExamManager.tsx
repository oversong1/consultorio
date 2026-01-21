import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useExams } from '../hooks/useExams';

interface ExamFormData {
  name: string;
  specialty: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ExamManager({ isOpen, onClose }: Props) {
  const { exams, createExam, deleteExam, loading, fetchExams } = useExams();
  const { register, handleSubmit, reset } = useForm<ExamFormData>();

  // AJUSTE: Carrega os exames assim que o modal abre
  useEffect(() => {
    if (isOpen) {
      fetchExams();
    }
  }, [isOpen, fetchExams]);

  if (!isOpen) return null;

  const onSubmit = async (data: ExamFormData) => {
    try {
      await createExam(data.name, data.specialty);
      await fetchExams(); 
      alert('Exame adicionado com sucesso!');
      reset();
    } catch (err: unknown) {
      let message = "Erro ao adicionar exame.";
      if (err instanceof Error) message = err.message;
      alert(message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExam(id);
      await fetchExams();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Gerenciar Exames</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <input
            {...register('name')}
            placeholder="Nome (ex: Raio-X)"
            required
            className="border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            {...register('specialty')}
            placeholder="Especialidade"
            required
            className="border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all text-sm h-[42px] disabled:bg-gray-400 shadow-sm active:scale-95"
          >
            {loading ? '...' : '+ Adicionar'}
          </button>
        </form>

        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
          {exams.length === 0 && !loading && (
            <p className="text-center text-gray-400 py-4 text-sm">Nenhum exame cadastrado.</p>
          )}
          
          {exams.map((exam) => (
            <div key={exam.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-200 transition-colors">
              <div className="truncate mr-2">
                <p className="font-bold text-gray-800 text-sm truncate">{exam.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{exam.specialty}</p>
              </div>
              <button
                onClick={() => handleDelete(exam.id)}
                className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-md transition-all text-sm font-semibold"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}