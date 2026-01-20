/**
 * Este arquivo serve para fazer um "Module Augmentation".
 * Estamos reabrindo a definição de tipos do Express para injetar
 * novas propriedades que não existem por padrão.
 */
declare namespace Express {
    export interface Request {
        /**
         * Adicionamos o 'userId' para que, após o middleware de autenticação
         * validar o token, possamos repassar o ID do usuário logado
         * diretamente pelo objeto da requisição (req).
         */
        userId: string;
    }
}

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}