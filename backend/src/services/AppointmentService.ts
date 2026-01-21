import { AppDataSource } from "../database/data-source";
import { Appointment } from "../database/entities/Appointment";
import { Exam } from "../database/entities/Exam";

class AppointmentService {
  private repo = AppDataSource.getRepository(Appointment);
  private examRepo = AppDataSource.getRepository(Exam);

  async create(appointment_date: Date, exam_id: string, user_id: string, observations?: string) {
    const exam = await this.examRepo.findOneBy({ id: exam_id });
    if (!exam) {
      throw new Error("O tipo de exame selecionado não existe.");
    }

    const appointment = this.repo.create({
      appointment_date,
      exam_id,
      user_id,
      observations
    });

    await this.repo.save(appointment);
    return appointment;
  }

  async list() {
    return await this.repo.find({
      relations: ["exam", "user"],
      order: { appointment_date: "ASC" }
    });
  }

  // MÉTODO ADICIONADO: Update seguindo o padrão TypeORM
  async update({ id, appointment_date, exam_id, user_id, observations }: any) {
    // 1. Verificar se o agendamento existe e pertence ao usuário
    const appointment = await this.repo.findOneBy({ id, user_id });

    if (!appointment) {
      throw new Error("Agendamento não encontrado ou você não tem permissão para editá-lo.");
    }

    // 2. Se mudou o exame, validar se o novo exame existe
    if (exam_id) {
      const examExists = await this.examRepo.findOneBy({ id: exam_id });
      if (!examExists) {
        throw new Error("O tipo de exame selecionado não existe.");
      }
    }

    // 3. Atualizar os campos permitidos
    appointment.appointment_date = appointment_date || appointment.appointment_date;
    appointment.exam_id = exam_id || appointment.exam_id;
    appointment.observations = observations !== undefined ? observations : appointment.observations;

    // 4. Salvar as alterações
    await this.repo.save(appointment);
    
    return appointment;
  }

  async delete(id: string, user_id: string) {
    const appointment = await this.repo.findOneBy({ id });

    if (!appointment) {
      throw new Error("Agendamento não encontrado.");
    }

    await this.repo.delete(id);
  }
}

export { AppointmentService };