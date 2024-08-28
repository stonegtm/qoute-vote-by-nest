import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/config/database/entities/user.entity';
const jwt = require('jsonwebtoken');
@Injectable()
export class JwtAuthCheckRoleGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('JWT token missing');
    }

    try {
      await this.verifyToken(token);
      return super.canActivate(context) as Promise<boolean>;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid token or secret key || Some fuction must using user role admin',
      );
    }
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing JWT token');
    }
    return user;
  }

  private async verifyToken(token: string): Promise<any> {
    try {
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'qoute168',
        (err, decode: UserEntity) => {
          if (err) {
            console.error('Verification Error:', err);
          } else {
            if (!decode.role_admin || !decode.role_admin) {
              throw new UnauthorizedException();
            }
          }
        },
      );
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token or secret key');
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authorization = request.headers['authorization'];
    if (!authorization) return null;
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
