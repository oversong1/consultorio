import { Request, Response } from "express";
import { CreateDoctorService } from "../services/CreateDoctorService";

class CreateDoctorController {
  async handle(req: Request, res: Response) {
    const { name, crm, email, specialty } = req.body;

    const service = new CreateDoctorService();

    try {
      const result = await service.execute({
        name,
        crm,
        email,
        specialty,
      });

      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { CreateDoctorController };