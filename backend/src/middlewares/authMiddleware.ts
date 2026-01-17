import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface para definir o formato do payload do token
interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export function authMiddleware(
    req: Request, res: Response, next: NextFunction
) {
    // 1. Pega o token do cabeçalho da requisição
    const { authorization } = req.headers;

    // 2. Verifica se o cabeçalho existe
    if (!authorization) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    // 3. Remove a palavra "Bearer " para pegar só o código do token
    const token = authorization.replace('Bearer', '').trim();

    try {
        // 4. Valida o token usando a mesma chave do AuthController
        const data = jwt.verify(token, "secret_key");

        // 5. Se for válido, extrai o ID e injeta na requisição para uso futuro
        const { id } = data as TokenPayload;
        req.userId = id;

        // 6. Autoriza a continuação para o próximo passo (Controller)
        return next();
    } catch {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
}