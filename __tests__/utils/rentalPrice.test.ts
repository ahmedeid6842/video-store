import { describe, vi, it, expect, Mock } from "vitest";
import { rentalPrice } from "../../src/utils/rentalPrice";

describe("rentalPrice", () => {
    vi.setSystemTime(new Date('2024-10-31'));
    it("should return 0 if daysRented is 0", () => {
        const result = rentalPrice(new Date('2024-10-31'), 2);
        expect(result).toBe(0);
    });

    it("should return 2 if daysRented is 1", () => {
        const result = rentalPrice(new Date('2024-10-30'), 2);
        expect(result).toBe(2);
    });

    it("should return 6 if daysRented is 2 and daily rental rate is 3 - 2*3", () => {
        const result = rentalPrice(new Date('2024-10-29'), 3);
        expect(result).toBe(6);
    });

});