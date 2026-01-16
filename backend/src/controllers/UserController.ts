import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";

export class UserController {
    /**
     * Método responsável pela criação de um novo usuário.
     * Recebe os dados da requisição, valida a existência e persiste no banco.
     */
    async create(req: Request, res: Response) {
        // Desestrutura os dados enviados no corpo (body) da requisição
        const { name, email, password } = req.body;

        // Verifica no banco de dados se já existe um usuário com o e-mail informado
        const userExists = await userRepository.findOneBy({ email });

        // Se o usuário existir, retorna erro 400 (Bad Request) para interromper a criação
        if (userExists) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        // Prepara a instância do novo usuário (ainda não salva no banco aqui)
        const newUser = userRepository.create({
            name,
            email,
            password
        });

        // Efetiva a gravação do novo usuário na tabela do banco de dados
        await userRepository.save(newUser);

        // Retorna o status 201 (Created) e o objeto do usuário recém-criado
        return res.status(201).json(newUser);
    }
}