import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { CreateDoctorController } from "./controllers/CreateDoctorController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/users", new UserController().create);
routes.post("/login", new AuthController().authenticate);

// Rota para cadastrar médico (Protegida)
routes.post("/doctors", authMiddleware, new CreateDoctorController().handle);

routes.get("/profile", authMiddleware, (req, res) => {
    return res.json({ userId: req.userId });
});

export { routes };