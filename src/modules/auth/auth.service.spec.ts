// auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'), // Mock the JWT sign function
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateToken', () => {
    it('should return an access token', async () => {
      const user = { userId: 1, username: 'testuser' };
      const result = await service.generateToken(user);
      expect(result).toEqual({ access_token: 'mockToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.userId,
      });
    });
  });

  describe('validateUser', () => {
    it('should return the user object if valid', async () => {
      const result = await service.validateUser('testuser', 'testpassword');
      expect(result).toEqual({ userId: 1, username: 'testuser' });
    });
  });
});
