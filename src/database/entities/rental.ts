import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./customer";
import { Movie } from "./movie";

@Entity("rentals")
export class Rental extends BaseEntity {
  @PrimaryGeneratedColumn()
  rental_id: number;

  @ManyToOne(() => Customer, (customer) => customer.rentals)
  @JoinColumn({ name: "customer", referencedColumnName: "customer_id" })
  customer: Customer;

  @ManyToOne(() => Movie, (movie) => movie.rentals)
  @JoinColumn({ name: "movie", referencedColumnName: "movie_id" })
  movie: Movie;

  @CreateDateColumn()
  dateOut: Date;

  @Column({ type: "text", nullable: true })
  dateReturned: string;

  @Column({ type: "decimal", nullable: true })
  rentalFee: number;
}
