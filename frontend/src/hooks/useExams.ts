import { useState, useCallback } from 'react';
import api from '../services/api';

export interface Exam {
  id: string;
  name: string;
  specialty: string;
}

export function useExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/exams');
      setExams(response.data);
    } catch (err) {
      console.error("Erro ao buscar exames", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createExam = async (name: string, specialty: string) => {
    await api.post('/exams', { name, specialty });
    await fetchExams();
  };

  const deleteExam = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este tipo de exame? Isso pode afetar agendamentos existentes.")) {
      await api.delete(`/exams/${id}`);
      await fetchExams();
    }
  };

  return { exams, loading, fetchExams, createExam, deleteExam };
}