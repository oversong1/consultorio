import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Doctor } from "./entities/Doctor";
import { Exam } from "./entities/Exam";
import { Appointment } from "./entities/Appointment";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
    port: Number(process.env.MYSQLPORT) || 3306,
    username: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "root",
    database: process.env.MYSQLDATABASE || "med_schedule",
    synchronize: true, 
    logging: true,
    entities: [User, Doctor, Exam, Appointment],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
});