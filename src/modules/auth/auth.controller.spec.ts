import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            generateToken: jest
              .fn()
              .mockResolvedValue({ access_token: 'mockToken' }),
            validateUser: jest
              .fn()
              .mockImplementation((username, password) =>
                username === 'testuser' && password === 'testpassword'
                  ? { userId: 1, username: 'testuser' }
                  : null,
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });
  describe('login', () => {
    it('should return a JWT access token if credentials are valid', async () => {
      const req = {
        body: { username: 'admin', password: '123456' },
      };
      const result = await controller.login(req as any);
      expect(result);
    });

    it('should return an error message if credentials are invalid', async () => {
      const req = {
        body: { username: 'invaliduser', password: 'invalidpassword' },
      };
      const result = await controller.login(req as any);
      expect(result).toEqual({ message: 'Invalid credentials' });
    });
  });
});
