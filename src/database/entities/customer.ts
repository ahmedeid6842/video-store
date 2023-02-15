import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Rental } from "./rental";

@Entity("customers")
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  name: string;

  @Column({ type: "boolean", default: false })
  isGold: boolean;

  @Column({ type: "text", nullable: false })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Rental,(rental)=>rental.customer)
  rentals: Rental[];
}
