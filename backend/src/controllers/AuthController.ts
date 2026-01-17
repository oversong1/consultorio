import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        // 1. Verificar se o e-mail existe
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            return res.status(401).json({ message: "E-mail ou senha inválidos" });
        }

        // 2. Verificar se a senha bate com o hash do banco
        const isValidPassword = await compare(password, user.password!);

        if (!isValidPassword) {
            return res.status(401).json({ message: "E-mail ou senha inválidos" });
        }

        // 3. Gerar o Token JWT (expira em 1 dia)
        // No mundo real, a 'secret_key' deve ficar no arquivo .env
        const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: '1d' });

        // 4. Retornar os dados do usuário e o token
        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        });
    }
}