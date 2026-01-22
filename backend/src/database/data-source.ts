import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Doctor } from "./entities/Doctor";
import { Exam } from "./entities/Exam";
import { Appointment } from "./entities/Appointment";

export const AppDataSource = new DataSource({
    type: "mysql",
    // host: "localhost",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: "root",
    password: "root", 
    database: "med_schedule",
    synchronize: false, // Recomendado usar false quando se usa migrations
    logging: true,
    entities: [User, Doctor, Exam, Appointment],
    /**
     * Adicionamos o caminho para encontrar todos os arquivos .ts 
     * dentro da pasta migrations.
     */
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
});