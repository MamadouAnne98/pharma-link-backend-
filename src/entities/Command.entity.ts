import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from "typeorm";
import { Distributor } from "./Distributor.entity";
import { CommandDetails } from "./CommandDetails.entity";
import { Pharmacy } from "./Pharmacy.entity";


@Entity({name:"command"})
export class Command {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  code: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  commandreference: string;

  @Column({ nullable: true })
  invoicereference: string;

  @Column({ type: "double precision", default: 0, nullable: true })
  totalprice: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  date: Date;

  @Column()
  pharmacyId: string;

  @Column({name:"distibutorid"})
  distributorid: number;

  // Relations
  @ManyToOne(() => Distributor, distributor => distributor.commands, { onDelete: "CASCADE" })
  @JoinColumn({ name: "distributorid" })
  distributor: Distributor;

  @ManyToOne(() => Distributor)
  @JoinColumn({ name: "distributor_id" })
  mainDistributor: Distributor;

  @ManyToOne(() => Pharmacy)
  @JoinColumn({ name: "pharmacyId" })
  pharmacy: Pharmacy;

  @OneToMany(() => CommandDetails, detail => detail.command)
  details: CommandDetails[];
}
