import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { DoctorController } from "./controllers/DoctorController";
import { ExamController } from "./controllers/ExamController"; 
import { authMiddleware } from "./middlewares/authMiddleware";
import { AppointmentController } from "./controllers/AppointmentController";

const routes = Router();
const doctorController = new DoctorController(); // Instância única
const examController = new ExamController();
const appointmentController = new AppointmentController();

routes.post("/users", new UserController().create);
routes.post("/login", new AuthController().authenticate);

// CRUD de Médicos (Todas as rotas protegidas)
routes.post("/doctors", authMiddleware, doctorController.create);
routes.get("/doctors", authMiddleware, doctorController.list);
routes.get("/doctors/:id", authMiddleware, doctorController.show);// Rota para ver detalhes de um médico específico
routes.put("/doctors/:id", authMiddleware, doctorController.update);
routes.delete("/doctors/:id", authMiddleware, doctorController.delete);

// Gerenciamento de Exames
routes.post("/exams", authMiddleware, examController.create);
routes.get("/exams", authMiddleware, examController.list);
routes.get("/exams/:id", authMiddleware, examController.show);
routes.delete("/exams/:id", authMiddleware, examController.delete);

// Agendamento de Exames
routes.post("/appointments", authMiddleware, appointmentController.create);
routes.get("/appointments", authMiddleware, appointmentController.list);
routes.put("/appointments/:id", authMiddleware, appointmentController.update);
routes.delete("/appointments/:id", authMiddleware, appointmentController.delete);

routes.get("/profile", authMiddleware, (req, res) => {
    return res.json({ userId: req.userId });
});

export { routes };