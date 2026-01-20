import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { DoctorController } from "./controllers/DoctorController"; 
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();
const doctorController = new DoctorController(); // Instância única

routes.post("/users", new UserController().create);
routes.post("/login", new AuthController().authenticate);

// CRUD de Médicos (Todas as rotas protegidas)
routes.post("/doctors", authMiddleware, doctorController.create);
routes.get("/doctors", authMiddleware, doctorController.list);
routes.get("/doctors/:id", authMiddleware, doctorController.show);// Rota para ver detalhes de um médico específico
routes.put("/doctors/:id", authMiddleware, doctorController.update);
routes.delete("/doctors/:id", authMiddleware, doctorController.delete);

routes.get("/profile", authMiddleware, (req, res) => {
    return res.json({ userId: req.userId });
});

export { routes };