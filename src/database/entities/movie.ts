import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Genre } from "./genre";

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

  @Column({ type: "int", default: 0.0 })
  numberInStock: number;

  @Column({ type: "int", nullable: false })
  dailyRentalRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
