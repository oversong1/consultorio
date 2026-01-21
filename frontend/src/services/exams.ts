import api from "./api"; // Sem as chaves {}

export interface ExamDTO {
  id: string;
  name: string;
  specialty: string;
}

export const examService = {
  list: () => api.get<ExamDTO[]>("/exams"),
};