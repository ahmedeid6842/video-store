import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: "text", nullable: false })
  password: string;

  @Column({ type: "boolean", default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
