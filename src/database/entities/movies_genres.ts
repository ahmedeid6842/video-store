import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie";
import { Genre } from "./genre";

@Entity("movies_genres")
export class MovieGenre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

    
  @ManyToOne(() => Movie, (movie) => movie.genres)
  movie: Movie;

  @ManyToOne(() => Genre, (genre) => genre.movies)
  genre: Genre;
}
