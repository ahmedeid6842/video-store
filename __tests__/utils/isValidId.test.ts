import { Mock, describe, expect, it, vi } from "vitest";
import { Genre } from "../../src/database/entities/genre";
import {Movie} from "../../src/database/entities/movie";
import {Customer} from "../../src/database/entities/customer";
import { isValidCustomerId, isValidGenreId, isValidMovieId } from "../../src/utils/isValidId";

vi.mock("../../src/database/entities/genre", () => ({
    Genre: {
        findOne: vi.fn(),
    }
}));

vi.mock("../../src/database/entities/movie", () => ({
    Movie: {
        findOne: vi.fn(),
    }
}));

vi.mock("../../src/database/entities/customer", () => ({
    Customer: {
        findOne: vi.fn(),
    }
}));

const createGenre = (overrides = {}): Partial<Genre> => ({
    genre_id: 1,
    name: "Action",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

const createMovie = (overrides = {}): Partial<Movie> => ({
    movie_id: 1,
    title: "The Dark Knight",
    genres: [createGenre()] as any,
    numberInStock: 10,
    dailyRentalRate: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

const createCustomer = (overrides = {}): Partial<Customer> => ({
    customer_id: 1,
    name: "John Doe",
    isGold: false,
    phone: "1234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

describe("isValidGenreId",()=>{

    it("should return true if genre exists", async()=>{
        (Genre.findOne as Mock).mockResolvedValueOnce(createGenre());

        const result = await isValidGenreId("1");

        expect(result).toBe(true);
    })

    it("should return false if genre does not exist", async()=>{
        (Genre.findOne as Mock).mockResolvedValueOnce(null);

        const result = await isValidGenreId("15");

        expect(result).toBe(false);
    })
})

describe("isValidMovieId",()=>{
    it("should return true if movie exists", async()=>{
        (Movie.findOne as Mock).mockResolvedValueOnce(createMovie());

        const result = await isValidMovieId("2"); 

        expect(result).toBe(true);
    })

    it("should return false if movie does not exist", async()=>{
        (Movie.findOne as Mock).mockResolvedValueOnce(null);

        const result = await isValidMovieId("16");

        expect(result).toBe(false);
    })
});

describe("isValidCustomerId",()=>{
    it("should return true if customer exists", async()=>{
        (Customer.findOne as Mock).mockResolvedValueOnce(createCustomer());

        const result = await isValidCustomerId("1");

        expect(result).toBe(true);
    })

    it("should return false if customer does not exist", async()=>{
        (Customer.findOne as Mock).mockResolvedValueOnce(null);

        const result = await isValidCustomerId("15");

        expect(result).toBe(false);
    })
});