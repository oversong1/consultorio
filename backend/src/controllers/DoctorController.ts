import { Request, Response } from "express";
import { DoctorService } from "../services/DoctorService";

class DoctorController {
  // Método para Criar
  async create(req: Request, res: Response) {
    const { name, crm, email, specialty } = req.body;
    const service = new DoctorService();

    try {
      const result = await service.create({ name, crm, email, specialty });
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Método para Listar
  async list(req: Request, res: Response) {
    const service = new DoctorService();
    const doctors = await service.list();
    return res.json(doctors);
  }

  // Método para buscar um único médico
  async show(req: Request, res: Response) {
    const id = req.params.id as string;
    const service = new DoctorService();

    try {
        const doctor = await service.show(id);
        return res.json(doctor);
      } catch (err: any) {
        return res.status(404).json({ error: err.message });
    }
    }

  // Método para Atualizar
  async update(req: Request, res: Response) {
    // const { id } = req.params;
    const id = req.params.id as string;
    const { name, specialty, email } = req.body;
    const service = new DoctorService();

    try {
      const result = await service.update({ id, name, specialty, email });
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Método para Deletar
  async delete(req: Request, res: Response) {
    // const { id } = req.params;
    const id = req.params.id as string;
    const service = new DoctorService();

    try {
      await service.delete(id);
      return res.status(204).send(); // Sucesso sem conteúdo
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { DoctorController };