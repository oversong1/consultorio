import { AppDataSource } from "../database/data-source";
import { Doctor } from "../database/entities/Doctor";

// Interface para organizar os dados de atualização
interface IDoctorUpdate {
  id: string;
  name?: string;
  specialty?: string;
  email?: string;
}

class DoctorService {
  private repo = AppDataSource.getRepository(Doctor);

  // Reutilizando sua lógica de criação
  async create({ name, crm, email, specialty }: any) {
    const doctorExists = await this.repo.findOne({
      where: [{ crm }, { email }],
    });

    if (doctorExists) {
      throw new Error("Médico com este CRM ou E-mail já cadastrado.");
    }

    const doctor = this.repo.create({ name, crm, email, specialty });
    await this.repo.save(doctor);

    return doctor;
  }

  // Listagem simples
    async list() {
        return await this.repo.find({ order: { name: "ASC" } });
    }
    
    // Busca um único médico por ID
    async show(id: string) {
        const doctor = await this.repo.findOneBy({ id });

    if(!doctor) {
        throw new Error("Médico não encontrado.");
    }

    return doctor;
}

  // Atualização com validação de existência
  async update({ id, name, specialty, email }: IDoctorUpdate) {
    const doctor = await this.repo.findOneBy({ id });

    if (!doctor) {
      throw new Error("Médico não encontrado.");
    }

    // Atualiza apenas os campos enviados
    doctor.name = name ?? doctor.name;
    doctor.specialty = specialty ?? doctor.specialty;
    doctor.email = email ?? doctor.email;

    await this.repo.save(doctor);
    return doctor;
  }

  // Exclusão
  async delete(id: string) {
    const doctor = await this.repo.findOneBy({ id });

    if (!doctor) {
      throw new Error("Médico não encontrado.");
    }

    await this.repo.delete(id);
  }
}

export { DoctorService };