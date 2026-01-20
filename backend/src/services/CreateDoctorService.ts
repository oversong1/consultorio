import { AppDataSource } from "../database/data-source";
import { Doctor } from "../database/entities/Doctor";

interface DoctorRequest {
  name: string;
  crm: string;
  email: string;
  specialty: string;
}

class CreateDoctorService {
  async execute({ name, crm, email, specialty }: DoctorRequest): Promise<Doctor> {
    const repo = AppDataSource.getRepository(Doctor);

    // 1. Verificar se o CRM já existe
    const doctorAlreadyExists = await repo.findOneBy({ crm });

    if (doctorAlreadyExists) {
      throw new Error("CRM já cadastrado para outro médico.");
    }

    // 2. Verificar se o Email já existe
    const emailAlreadyExists = await repo.findOneBy({ email });

    if (emailAlreadyExists) {
      throw new Error("E-mail já cadastrado para outro médico.");
    }

    // 3. Criar a instância e salvar
    const doctor = repo.create({
      name,
      crm,
      email,
      specialty,
    });

    await repo.save(doctor);

    return doctor;
  }
}

export { CreateDoctorService };