import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

/**
 * Definição da rota de criação de usuário:
 * Método: POST
 * Caminho: /users
 * Ação: Chama o método 'create' da classe 'UserController'
 */
routes.post("/users", new UserController().create);

export { routes };