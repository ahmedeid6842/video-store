import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import jwt from 'jsonwebtoken';
import config from 'config';
import {jwtPayload} from "../../src/types/jwtPayload";
import {createToken, verifyToken} from "../../src/utils/token"

vi.mock('config');
vi.mock('jsonwebtoken');

describe('Token Utils', () => {
  const mockJWTSecret = 'mock_secret';
  const mockPayload: jwtPayload = { _id: 1231, isAdmin: true };

  beforeEach(() => {
    vi.resetAllMocks();
    (config.get as Mock).mockReturnValue(mockJWTSecret);
  });

  describe('createToken', () => {
    it('should create a JWT token with the given payload and secret', () => {
      const mockToken = 'mockToken';
      (jwt.sign as Mock).mockReturnValue(mockToken);

      const token = createToken(mockPayload);

      expect(jwt.sign).toHaveBeenCalledWith(mockPayload, mockJWTSecret, { expiresIn: '15m' });
      expect(token).toBe(mockToken);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid JWT token and return the payload', () => {
      const mockDecodedPayload = { _id: 1231, isAdmin: true };
      (jwt.verify as Mock).mockReturnValue(mockDecodedPayload);

      const result = verifyToken('validToken');

      expect(jwt.verify).toHaveBeenCalledWith('validToken', mockJWTSecret);
      expect(result).toBe(mockDecodedPayload);
    });

    it('should throw an error for an invalid JWT token', () => {
      (jwt.verify as Mock).mockImplementation(() => {
        throw new Error('invalid Token Provided');
      });

      expect(() => verifyToken('invalidToken')).toThrow('invalid Token Provided');
    });
  });
});
