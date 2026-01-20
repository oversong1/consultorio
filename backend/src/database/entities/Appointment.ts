import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Exam } from "./Exam";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  appointment_date!: Date;

  @Column({ nullable: true })
  observations?: string;

  // Relacionamento com Usuário
  @Column()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  // Relacionamento com Exame
  @Column()
  exam_id!: string;

  @ManyToOne(() => Exam)
  @JoinColumn({ name: "exam_id" })
  exam!: Exam;

  @CreateDateColumn()
  created_at!: Date;
}