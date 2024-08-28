import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { generateUuid } from 'src/utils/genuuid';
import { RegisterUserDto } from './dto/register-user.dio';
import { CreateUserService } from 'src/usecases/user/create-user/create-user.service';
import { LoginService } from 'src/usecases/user/login/login.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
  ) {}

  async loginForToken(createAuthDto: CreateAuthDto) {
    try {
      return await this.loginService.execute(createAuthDto);
    } catch (error) {
      throw error;
    }
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      return this.createUserService.execute(registerUserDto);
    } catch (error) {
      throw error;
    }
  }
}
