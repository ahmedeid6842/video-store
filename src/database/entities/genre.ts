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

@Entity("genres")
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  genre_id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @OneToMany(() => MovieGenre, (movie_genre) => movie_genre.genre)
  movies: MovieGenre[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
