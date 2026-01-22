import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Doctor } from "./entities/Doctor";
import { Exam } from "./entities/Exam";
import { Appointment } from "./entities/Appointment";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.MYSQLUSER || "root",     // Mudamos aqui
    password: process.env.MYSQLPASSWORD || "root", // Mudamos aqui
    database: process.env.MYSQLDATABASE || "med_schedule", // Mudamos aqui
    synchronize: true, // No primeiro deploy, mude para true para ele criar as tabelas sozinho
    logging: true,
    entities: [User, Doctor, Exam, Appointment],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
});