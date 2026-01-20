import { AppDataSource } from "../database/data-source";
import { Exam } from "../database/entities/Exam";

class ExamService {
  private repo = AppDataSource.getRepository(Exam);

  // Criar novo tipo de exame (Alimenta o catálogo)
  async create(name: string, specialty: string) {
    const examExists = await this.repo.findOneBy({ name });

    if (examExists) {
      throw new Error("Este tipo de exame já está cadastrado.");
    }

    const exam = this.repo.create({ name, specialty });
    await this.repo.save(exam);

    return exam;
  }

  // 1. Visualizar Exames Disponíveis (Listar todos)
  async list() {
    return await this.repo.find({ order: { name: "ASC" } });
  }

  // 1. Detalhes de cada exame (Busca por ID para seleção)
  async show(id: string) {
    const exam = await this.repo.findOneBy({ id });

    if (!exam) {
      throw new Error("Exame não encontrado.");
    }

    return exam;
  }

  // Excluir Exame (Opcional para manutenção do catálogo)
  async delete(id: string) {
    const exam = await this.repo.findOneBy({ id });

    if (!exam) {
      throw new Error("Exame não encontrado.");
    }

    await this.repo.delete(id);
  }
}

export { ExamService };