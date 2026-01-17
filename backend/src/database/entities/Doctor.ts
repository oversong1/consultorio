import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("doctors")
export class Doctor {
    @PrimaryGeneratedColumn("uuid")
    id!: string; // O '!' avisa que o TypeORM vai inicializar isso

    @Column()
    name!: string;

    @Column({ unique: true })
    crm!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    specialty!: string;

    @CreateDateColumn()
    created_at!: Date;
}