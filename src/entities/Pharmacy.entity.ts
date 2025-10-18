import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
import { PharmacyCustomerType } from "../enums/PharmacyCustomerType";
import { PharmacyState } from "../enums/PharmacyState";
import { Zone } from "./Zone.entity";


@Entity()
export class Pharmacy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ nullable: true })
  doctorName: string;

  @Column({ nullable: true })
  managerName: string;

  @Column({
    type: "enum",
    enum: PharmacyCustomerType,
    default: PharmacyCustomerType.PHARMACY
  })
  customerType:PharmacyCustomerType;

  @Column({ type: "point", nullable: true })
  location: string; // TypeORM ne supporte pas directement "point", on le mappe en string ou custom type

  @Column({ nullable: true })
  zoneId: string;

  @Column({ nullable: true })
  userId: number;

  @Column({
    type: "enum",
    enum: PharmacyState,
    default: PharmacyState.PENDING
  })
  state: PharmacyState;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Zone)
  @JoinColumn({ name: "zoneId" })
  zone: Zone;
}
