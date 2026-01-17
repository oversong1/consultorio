import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

/**
 * Definição da rota de criação de usuário:
 * Método: POST
 * Caminho: /users
 * Ação: Chama o método 'create' da classe 'UserController'
 */
routes.post("/users", new UserController().create); // rota de criação 
routes.post("/login", new AuthController().authenticate); // rota de login


// Rota protegida: apenas usuários logados (com token) podem acessar
// Vamos criar um exemplo de rota que retorna o status do próprio usuário
routes.get("/profile", authMiddleware, (req, res) => {
    return res.json({ userId: req.userId });
});

export { routes };