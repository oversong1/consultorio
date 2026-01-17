import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController"; 

const routes = Router();

/**
 * Definição da rota de criação de usuário:
 * Método: POST
 * Caminho: /users
 * Ação: Chama o método 'create' da classe 'UserController'
 */
routes.post("/users", new UserController().create); // rota de criação 
routes.post("/login", new AuthController().authenticate); // rota de login

export { routes };