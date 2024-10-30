import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Request, Response } from 'express';
import { Customer } from "../../src/database/entities/customer";
import { createCustomerController, deleteCustomerController, getCustomerController, updateCustomerController } from '../../src/controllers/customer';
import { createCustomerInput } from 'src/validators/customer';

vi.mock("../../src/database/entities/customer", () => ({
    Customer: {
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
            insert: vi.fn().mockReturnThis(),
            into: vi.fn().mockReturnThis(),
            values: vi.fn().mockReturnThis(),
            returning: vi.fn().mockReturnThis(),
            execute: vi.fn()
        })),
    }
}));

const createMockResponse = () => {
    const send = vi.fn();
    const status = vi.fn(() => ({ send }));
    const header = vi.fn(() => ({ send }));

    return {
        res: {
            status,
            header,
            send,
        } as unknown as Partial<Response>,
        send,
        status,
        header,
    }
}

const createCustomerObj = (overrides = {}): Partial<Customer> => ({
    customer_id: 1,
    name: "Test Customer",
    isGold: false,
    phone: "1234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

describe("getCustomerController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status: Mock;

    let customerObj: Partial<Customer>;

    beforeEach(() => {
        req = {
            params: {
                id: "1"
            }
        };

        ({ res, send, status } = createMockResponse());

        customerObj = createCustomerObj();
    })

    it("should return 404 if no customer customerfound", async () => {
        (Customer.findOne as Mock).mockResolvedValueOnce(undefined);

        await getCustomerController(req as Request<{ id: string }>, res as Response);

        expect(status).toHaveBeenCalledWith(404);
        expect(send).toHaveBeenCalledWith("no customer found with that id");
    })

    it("should return customer if found", async () => {
        (Customer.findOne as Mock).mockResolvedValueOnce(customerObj);

        await getCustomerController(req as Request<{ id: string }>, res as Response);

        expect(send).toHaveBeenCalledWith(customerObj);
    })
})

describe("createCustomerController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;

    let customerObj: Partial<Customer>;

    beforeEach(() => {
        req = {
            body: {
                name: "Test Customer",
                isGold: false,
                phone: "1234567890"
            }
        };

        ({ res, send } = createMockResponse());

        customerObj = createCustomerObj();
    })

    it("should return customer exist if name found", async () => {
        (Customer.findOne as Mock).mockResolvedValueOnce(customerObj);

        await createCustomerController(req as Request<{ id: string }, {}, createCustomerInput>, res as Response);

        expect(send).toHaveBeenCalledWith("customer name already exist");
    })

    it("should return customer if created", async () => {
        (Customer.createQueryBuilder as Mock).mockReturnValueOnce({
            insert: vi.fn(() => ({
                into: vi.fn().mockReturnThis(),
                values: vi.fn().mockReturnThis(),
                returning: vi.fn().mockReturnThis(),
                execute: vi.fn().mockResolvedValueOnce({
                    raw: [customerObj]
                })
            })),

        });

        await createCustomerController(req as Request<{ id: string }, {}, createCustomerInput>, res as Response);

        expect(send).toHaveBeenCalledWith(customerObj);
    })
})

describe("updateCustomerController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;

    let customerObj: Partial<Customer>;

    beforeEach(() => {
        req = {
            params: {
                id: "1"
            },
            body: {
                name: "Updated Customer",
                isGold: true,
                phone: "1234567890"
            }
        } as unknown as Partial<Request>;

        ({ res, send } = createMockResponse());

        customerObj = {
            ...createCustomerObj(),
            name: "Updated Customer",
            isGold: true,
        }
    });

    it("should return updated customer", async () => {
        (Customer.createQueryBuilder as Mock).mockReturnValueOnce({
            update: vi.fn().mockReturnThis(),
            set: vi.fn().mockReturnThis(),
            where: vi.fn().mockReturnThis(),
            returning: vi.fn().mockReturnThis(),
            execute: vi.fn().mockResolvedValueOnce({ raw: [customerObj] })
        });

        await updateCustomerController(req as Request<{ id: string }, {}, createCustomerInput>, res as Response);

        expect(send).toHaveBeenCalledWith(customerObj);
    })
});

describe("deleteCustomerController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;

    beforeEach(() => {
        req = {
            params: {
                id: "1"
            }
        };

        ({ res, send } = createMockResponse());
    });

    it("should delete customer", async () => {
        await deleteCustomerController(req as Request<{id: string}>, res as Response);

        expect(send).toHaveBeenCalledWith({ deleted: true, message: "customer deleted succesfully" });
    });
});