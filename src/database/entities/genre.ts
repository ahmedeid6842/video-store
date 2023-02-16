import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Movie } from "./index";

@Entity("genres")
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  genre_id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  @JoinTable({
    name: "movies_genres",
    joinColumn: {
      name: "genre",
      referencedColumnName: "genre_id",
    },
    inverseJoinColumn: {
      name: "movie",
      referencedColumnName: "movie_id",
    },
  })
  movies: Movie[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
