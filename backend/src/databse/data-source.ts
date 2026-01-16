import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root", 
    database: "med_schedule",
    synchronize: true, // Isso cria as tabelas automaticamente (usar apenas em dev)
    logging: true,
    entities: [], 
    migrations: [],
    subscribers: [],
});