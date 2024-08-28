import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from 'src/modules/auth/dto/create-auth.dto';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const user = await this.userRepositoryService.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id, role_admin: user.role_admin };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
