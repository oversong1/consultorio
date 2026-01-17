import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs"; // Importa a função de criptografia

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const userExists = await userRepository.findOneBy({ email });

        if (userExists) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        // Criptografia: O '8' é o "salt", nível de segurança do hash
        const hashedPassword = await hash(password, 8);

        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword // Salva a senha criptografada
        });

        await userRepository.save(newUser);

        // Remove a senha do objeto de retorno por segurança
        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            created_at: newUser.created_at
        };

        return res.status(201).json(userResponse);
    }
}