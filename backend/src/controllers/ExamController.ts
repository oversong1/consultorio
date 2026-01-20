import { Request, Response } from "express";
import { ExamService } from "../services/ExamService";

class ExamController {
  // Criar um novo exame (Alimentar o catálogo)
  async create(req: Request, res: Response) {
    const { name, specialty } = req.body;
    const service = new ExamService();

    try {
      const result = await service.create(name, specialty);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Listar todos os exames disponíveis
  async list(req: Request, res: Response) {
    const service = new ExamService();
    const exams = await service.list();
    return res.json(exams);
  }

  // Detalhes de um exame específico
  async show(req: Request, res: Response) {
    const id = req.params.id as string;
    const service = new ExamService();

    try {
      const exam = await service.show(id);
      return res.json(exam);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  // Deletar um tipo de exame
  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const service = new ExamService();

    try {
      await service.delete(id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { ExamController };