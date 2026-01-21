import { Request, Response } from "express";
import { AppointmentService } from "../services/AppointmentService";

class AppointmentController {
  async create(req: Request, res: Response) {
    const { appointment_date, exam_id, observations } = req.body;
    
    // Pegamos o ID do usuário logado que foi injetado pelo authMiddleware
    const user_id = req.user.id; 

    const service = new AppointmentService();

    try {
      const appointment = await service.create(
        appointment_date,
        exam_id,
        user_id,
        observations
      );
      return res.status(201).json(appointment);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    const service = new AppointmentService();
    const appointments = await service.list();
    return res.json(appointments);
  }

  // MÉTODO ADICIONADO PARA RESOLVER O 404
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { appointment_date, exam_id, observations } = req.body;
    const user_id = req.user.id;

    const service = new AppointmentService();

    try {
      // Estamos passando os dados para o service do backend
      const appointment = await service.update({
        id,
        appointment_date,
        exam_id,
        user_id,
        observations
      });
      return res.json(appointment);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const user_id = req.user.id;
    const service = new AppointmentService();

    try {
      await service.delete(id, user_id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { AppointmentController };