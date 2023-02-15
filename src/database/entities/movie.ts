import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Genre } from "./genre";
import { Rental } from "./rental";

@Entity("movies")
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @ManyToMany((type) => Genre, (genre) => genre.movies, { cascade: true })
  @JoinTable({
    name: "movies_genres",
    joinColumn: {
      name: "movie",
      referencedColumnName: "movie_id",
    },
    inverseJoinColumn: {
      name: "genre",
      referencedColumnName: "genre_id",
    },
  })
  genres: Genre[];

  @OneToMany(() => Rental, (rental) => rental.movie)
  rentals: Rental[];

  @Column({ type: "int", default: 0.0 })
  numberInStock: number;

  @Column({ type: "int", nullable: false })
  dailyRentalRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
