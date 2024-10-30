import {describe, it, expect, Mock, vi, beforeEach} from 'vitest';
import {createMovieController, deleteMovieController, getMovieController, updateMovieController} from '../../src/controllers/movie';
import {Movie} from "../../src/database/entities/movie";
import {Genre} from "../../src/database/entities/genre";
import {Request, Response} from 'express';
import { createMovieInput, updateMovieInput } from 'src/validators/movie';

vi.mock("../../src/database/entities/movie", () => ({
    Movie: {
        findOne: vi.fn(),
        create: vi.fn(()=>({
            save: vi.fn()
        })),
        createQueryBuilder: vi.fn(() => ({
            update: vi.fn().mockReturnThis(),
            delete: vi.fn().mockReturnThis(),
            from: vi.fn().mockReturnThis(),
            set: vi.fn().mockReturnThis(),
            where: vi.fn().mockReturnThis(),
            returning: vi.fn().mockReturnThis(),
            execute: vi.fn()
        })),
    },
}));

vi.mock("../../src/database/entities/genre", () => ({
    Genre: {
        find: vi.fn(),
    },
}));

const createMockResponse = () => {
    const send = vi.fn();
    const status = vi.fn(() => ({send}));
    const header = vi.fn(() => ({send}));

    return {
        res: {
            status,
            header,
            send,
        } as unknown as Partial<Response>,
        send,
        status,
        header,
    };
}

const createMovieObj = (overrides = {}): Partial<Movie> => ({
    movie_id: 1,
    title: "Test Movie",
    genres: [],
    numberInStock: 1,
    dailyRentalRate: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

const createGenreObj = (overrides = {}): Partial<Genre> => ({
    name: "Test Genre",
    movies: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

describe("createMovieController",()=>{
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status: Mock;

    let movieObj: Partial<Movie>;
    let genreObj1: Partial<Genre>;
    let genreObj2: Partial<Genre>;

    beforeEach(()=>{
        req = {
            body: {
                title: "Test Movie",
                genreId: [1, 2],
                numberInStock: 1,
                dailyRentalRate: 1,
            } as createMovieInput
        };

        ({res, send, status} = createMockResponse());
        movieObj = createMovieObj();
        genreObj1 = createGenreObj({genre_id: "1"});
        genreObj2 = createGenreObj({genre_id: 2});
    });

    it('should return 404 if genere not found', async()=>{
        (Genre.find as Mock).mockResolvedValueOnce([1]);

        await createMovieController(req as Request, res as Response);

        expect(status).toHaveBeenCalledWith(404);
        expect(send).toHaveBeenCalledWith("invalid genreId");
    });

    it('should create a new movie', async()=>{
        (Genre.find as Mock).mockResolvedValueOnce([genreObj1, genreObj2]);
        (Movie.create as Mock).mockReturnValueOnce({
            save: vi.fn(()=>movieObj)
        });

        await createMovieController(req as Request, res as Response);

        expect(send).toHaveBeenCalledWith(movieObj);
    });
})

describe("getMovieController",()=>{
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status:Mock;

    let movieObj: Partial<Movie>;

    beforeEach(()=>{
        req = {
            params: {
                id: "1",
            }
        } as Request<{id: string}, {}, {}>;

        ({res, send, status} = createMockResponse());
        movieObj = createMovieObj();
    });

    it('should return 404 if movie not found',async()=>{
        (Movie.findOne as Mock).mockResolvedValueOnce(null);

        await getMovieController(req as Request<{id: string}, {}, {}>, res as Response);

        expect(status).toHaveBeenCalledWith(404);
        expect(send).toHaveBeenCalledWith("no file with that id ");
    })

    it('should return movie', async()=>{
        (Movie.findOne as Mock).mockResolvedValueOnce(movieObj);

        await getMovieController(req as Request<{id: string}, {}, {}>, res as Response);

        expect(send).toHaveBeenCalledWith(movieObj);
    })
});

describe("updateMovieController",()=>{
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;

    let movieObj: Partial<Movie>;

    beforeEach(()=>{
        req = {
            params: {
                id: "1",
            },
            body: {
                title: "Updated Movie",
                numberInStock: 2,
                dailyRentalRate: 3,
            } as updateMovieInput
        };

        ({res, send} = createMockResponse());
        movieObj = {
            movie_id: 1,
            title: "Updated Movie",
            numberInStock: 2,
            dailyRentalRate: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });

    it("should update movie", async()=>{
        (Movie.createQueryBuilder as Mock).mockReturnValueOnce({
            update: vi.fn(()=>({
                set: vi.fn().mockReturnThis(),
                where: vi.fn().mockReturnThis(),
                returning: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValueOnce({
                    raw: [movieObj],
                    affected: 1,
                })
            }))
        });

        await updateMovieController(req as Request<{id: string}, {}, updateMovieInput>, res as Response);

        expect(send).toHaveBeenCalledWith({raw: [movieObj], affected: 1});
    })
})

describe("deleteMovieController", ()=>{
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;

    beforeEach(()=>{
        req = {
            params: {
                id: "1",
            }
        };

        ({res, send} = createMockResponse());
    });

    it('should delete movie', async()=>{
        (Movie.createQueryBuilder as Mock).mockReturnValueOnce({
            delete: vi.fn().mockReturnThis(),
            from: vi.fn().mockReturnThis(),
            where: vi.fn().mockReturnThis(),
            execute: vi.fn(),
        });

        await deleteMovieController(req as Request<{id: string}>, res as Response);

        expect(send).toHaveBeenCalledWith({deleted: true, message: "movie deleted succesfully"});
    });
})