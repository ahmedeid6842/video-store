import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { MovieGenre } from "./movies_genres";

@Entity("movies")
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @OneToMany(() => MovieGenre, (movie_genre) => movie_genre.movie, {
    onDelete: "CASCADE",
  })
  genres: MovieGenre[];

  @Column({ type: "int", default: 0.0 })
  numberInStock: number;

  @Column({ type: "int", nullable: false })
  dailyRentalRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
