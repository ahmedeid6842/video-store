import { describe, it, expect, Mock, vi, beforeEach } from 'vitest';
import { Genre } from "../../src/database/entities/genre";
import { createGenreController, getGenreController, updateGenreController } from "../../src/controllers/genre";
import { Request, Response } from 'express';
import { create_updateGenreInput } from 'src/validators/genre';

vi.mock("../../src/database/entities/genre", () => ({
    Genre: {
        findOne: vi.fn(),
        create: vi.fn(() => ({
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
    }
}))

const createMockResponse = () => {
    const send = vi.fn();
    const status = vi.fn(() => ({ send }));

    return {
        res: {
            status,
            send,
        } as unknown as Partial<Response>,
        send,
        status,
    }
}

const createGenreObj = (overrides = {}): Partial<Genre> => ({
    genre_id: 1,
    name: "Test Genre",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

describe("getGenreController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status: Mock;

    let genreObj: Partial<Genre>;

    beforeEach(() => {
        req = {
            params: {
                id: "1"
            }
        };

        ({ res, send, status } = createMockResponse());

        genreObj = createGenreObj();
    })

    it("should return genre", async () => {
        (Genre.findOne as Mock).mockResolvedValueOnce(genreObj);

        await getGenreController(req as Request<{ id: string }>, res as Response);

        expect(send).toHaveBeenCalledWith(genreObj);
    })
})

describe("createGenreController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status: Mock;

    let genreObj: Partial<Genre>;

    beforeEach(() => {
        req = {
            body: {
                name: "Test Genre"
            }
        } as unknown as Partial<Request>;

        ({ res, send, status } = createMockResponse());
        genreObj = createGenreObj();
    })

    it("should should return 404 if Genere Exist", async () => {
        (Genre.findOne as Mock).mockResolvedValueOnce(genreObj);

        await createGenreController(req as Request, res as Response);

        expect(status).toHaveBeenCalledWith(400);
        expect(send).toHaveBeenCalledWith("genre name already exist");
    });

    it("should return created genre", async () => {
        (Genre.findOne as Mock).mockResolvedValueOnce(null);
        (Genre.create as Mock).mockReturnValueOnce({
            save: vi.fn().mockResolvedValueOnce(genreObj)
        });

        await createGenreController(req as Request, res as Response);

        expect(send).toHaveBeenCalledWith(genreObj);
    })
})

describe("updateGenreController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status: Mock;

    let genreObj: Partial<Genre>;

    beforeEach(() => {
        req = {
            params: {
                id: "1"
            },
            body: {
                name: "Updated Genre"
            }
        } as unknown as Partial<Request>;

        ({ res, send, status } = createMockResponse());

        genreObj = {
            ...createGenreObj(),
            name: "Updated Genre"
        }
    });

    it("should return updated genre", async()=>{
        (Genre.createQueryBuilder as Mock).mockReturnValueOnce({
            update: vi.fn().mockReturnThis(),
            set: vi.fn().mockReturnThis(),
            where: vi.fn().mockReturnThis(),
            returning: vi.fn().mockReturnThis(),
            execute: vi.fn().mockResolvedValueOnce({ raw: [genreObj] })
        });

        await updateGenreController(req as Request<{id: string},{},create_updateGenreInput>, res as Response);
     
        expect(send).toHaveBeenCalledWith(genreObj);
    })
});