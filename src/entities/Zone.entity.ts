import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Pharmacy } from "./Pharmacy.entity";


@Entity()
export class Zone {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  wilayaId: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  // Relation avec Pharmacy
  @OneToMany(() => Pharmacy, pharmacy => pharmacy.zone)
  pharmacies: Pharmacy[];
}
