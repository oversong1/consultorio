import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";

/**
 * O Repository é a camada que abstrai a comunicação com o banco de dados.
 * Aqui, estamos obtendo o repositório da entidade 'User' a partir da conexão principal (AppDataSource).
 * Com o 'userRepository', poderemos executar comandos como save, find, delete e update na tabela 'users'.
 */
export const userRepository = AppDataSource.getRepository(User);