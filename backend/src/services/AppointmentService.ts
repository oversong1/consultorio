import { AppDataSource } from "../database/data-source";
import { Appointment } from "../database/entities/Appointment";
import { Exam } from "../database/entities/Exam";

class AppointmentService {
  private repo = AppDataSource.getRepository(Appointment);
  private examRepo = AppDataSource.getRepository(Exam);

  // Criar Agendamento (Requisito: Adicionar Agendamento)
  async create(appointment_date: Date, exam_id: string, user_id: string, observations?: string) {
    // 1. Validar se o exame existe
    const exam = await this.examRepo.findOneBy({ id: exam_id });
    if (!exam) {
      throw new Error("O tipo de exame selecionado não existe.");
    }

    // 2. Criar o agendamento
    const appointment = this.repo.create({
      appointment_date,
      exam_id,
      user_id,
      observations
    });

    await this.repo.save(appointment);
    return appointment;
  }

  // Listar todos os agendamentos (Requisito: Visualizar Agendamentos)
  async list() {
    // Usamos 'relations' para trazer os dados do Exame e do Usuário junto
    return await this.repo.find({
      relations: ["exam", "user"],
      order: { appointment_date: "ASC" }
    });
  }

  // Excluir Agendamento (Requisito: Excluir Agendamento)
  async delete(id: string, user_id: string) {
    const appointment = await this.repo.findOneBy({ id });

    if (!appointment) {
      throw new Error("Agendamento não encontrado.");
    }

    // Opcional: Validar se o agendamento pertence ao usuário logado
    // if (appointment.user_id !== user_id) { throw new Error("Não autorizado."); }

    await this.repo.delete(id);
  }
}

export { AppointmentService };