import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dio';
import * as bcrypt from 'bcrypt';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository.service';
import { UserEntity } from 'src/config/database/entities/user.entity';
@Injectable()
export class CreateUserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}
  async execute(registerUserDto: RegisterUserDto) {
    const { username, password, email } = registerUserDto;
    const checkSameUser =
      await this.userRepositoryService.findCheckUniqUser(registerUserDto);

    if (checkSameUser) {
      throw new ConflictException('Username or email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserEntity();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;
    return await this.userRepositoryService.createUser(user);
  }
}
