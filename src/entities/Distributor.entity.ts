import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Command } from "./Command.entity";


@Entity()
export class Distributor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @Column({ default: true, nullable: true })
  is_active: boolean;

  // Relation avec Command
  @OneToMany(() => Command, command => command.distributor)
  commands: Command[];
}
