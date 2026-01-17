import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Doctor } from "./entities/Doctor";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root", 
    database: "med_schedule",
    synchronize: false, // Recomendado usar false quando se usa migrations
    logging: true,
    entities: [User, Doctor],
    /**
     * Adicionamos o caminho para encontrar todos os arquivos .ts 
     * dentro da pasta migrations.
     */
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
});