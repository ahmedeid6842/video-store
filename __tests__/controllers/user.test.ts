import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { loginController, registerController } from '../../src/controllers/user';
import { createToken } from "../../src/utils/token";
import bcrypt from "bcrypt";
import { User } from "../../src/database/entities/user";
import { Request, Response } from 'express';

vi.mock("bcrypt");
vi.mock("../../src/database/entities/user", () => ({
    User: {
        findOne: vi.fn(),
        createQueryBuilder: vi.fn(() => ({
            insert: vi.fn().mockReturnThis(),
            into: vi.fn().mockReturnThis(),
            values: vi.fn().mockReturnThis(),
            returning: vi.fn().mockReturnThis(),
            execute: vi.fn(),
        })),
    },
}));

vi.mock("../../src/utils/token", () => ({
    createToken: vi.fn(),
}));

// Helper to create mock request and response
const createMockResponse = () => {
    const send = vi.fn();
    const status = vi.fn(() => ({ send }));
    const header = vi.fn(() => ({ send }));

    return {
        res: {
            status,
            header,
        } as unknown as Partial<Response>,
        send,
        status,
        header,
    };
};

const createUserObj = (overrides = {}) => ({
    user_id: 1,
    name: "Test User",
    email: "test@example.com",
    password: 'hashedPassword123',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

// Test suite for registerController
describe("registerController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status: Mock;
    let header: Mock;

    let userObj: Partial<User>;

    beforeEach(() => {
        req = {
            body: {
                name: "Test User",
                email: "test@example.com",
                password: 'password123',
            },
        };

        ({ res, send, status, header } = createMockResponse());
        userObj = createUserObj();
    });

    it('should return 400 if the email already exists', async () => {
        (User.findOne as Mock).mockResolvedValueOnce(userObj as User);

        await registerController(req as Request, res as Response);

        expect(status).toHaveBeenCalledWith(400);
        expect(send).toHaveBeenCalledWith("email already exist");
    });

    it('should create a new user and return the token and user details', async () => {
        (User.findOne as Mock).mockResolvedValueOnce(null);
        (bcrypt.genSalt as Mock).mockResolvedValueOnce('salt');
        (bcrypt.hash as Mock).mockResolvedValueOnce('hashedPassword');
        (createToken as Mock).mockReturnValueOnce('mockedToken');

        const executeMock = vi.fn().mockResolvedValueOnce({ raw: [userObj as User] });
        (User.createQueryBuilder as Mock).mockReturnValueOnce({
            insert: vi.fn().mockReturnThis(),
            into: vi.fn().mockReturnThis(),
            values: vi.fn().mockReturnThis(),
            returning: vi.fn().mockReturnThis(),
            execute: executeMock,
        });

        await registerController(req as Request, res as Response);

        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
        expect(createToken).toHaveBeenCalledWith({ _id: userObj.user_id });
        expect(header).toHaveBeenCalledWith("x-auth-token", "mockedToken");
        expect(send).toHaveBeenCalledWith({ name: userObj.name, email: userObj.email });
    });
});

// Test suite for loginController
describe("loginController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: Mock;
    let status: Mock;
    let header: Mock;

    let userObj: Partial<User>;

    beforeEach(() => {
        req = {
            body: {
                email: "test@gmail.com",
                password: "Password123",
            },
        };

        ({ res, send, status, header } = createMockResponse());
        userObj = createUserObj();
    });

    it('should return 400 if the user does not exist', async () => {
        (User.findOne as Mock).mockResolvedValueOnce(null);

        await loginController(req as Request, res as Response);

        expect(status).toHaveBeenCalledWith(400);
        expect(send).toHaveBeenCalledWith("invalid user name or password");
    });

    it('should return 400 if the password is invalid', async () => {
        (User.findOne as Mock).mockResolvedValueOnce(userObj as User);
        (bcrypt.compare as Mock).mockResolvedValueOnce(false);

        await loginController(req as Request, res as Response);

        expect(bcrypt.compare).toHaveBeenCalledWith("Password123", userObj.password);
        expect(status).toHaveBeenCalledWith(400);
        expect(send).toHaveBeenCalledWith("invalid user name or password");
    });

    it('should return the token and user details if the user exists and password is valid', async () => {
        (User.findOne as Mock).mockResolvedValueOnce(userObj as User);
        (bcrypt.compare as Mock).mockResolvedValueOnce(true);
        (createToken as Mock).mockReturnValueOnce('mockedToken');

        await loginController(req as Request, res as Response);

        expect(createToken).toHaveBeenCalledWith({ _id: userObj.user_id, isAdmin: userObj.isAdmin });
        expect(header).toHaveBeenCalledWith("x-auth-token", "mockedToken");
        expect(send).toHaveBeenCalledWith({ name: userObj.name, email: userObj.email });
    });
});
