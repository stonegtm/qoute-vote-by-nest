import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
const jwt = require('jsonwebtoken');
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
      const decoded = await this.verifyToken(token);
      request.user = decoded; // Attach the decoded payload to request.user
      return super.canActivate(context) as Promise<boolean>;
    } catch (error) {
      throw new UnauthorizedException('Invalid token or secret key');
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
      // Verifies and decodes the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'qoute168');
      return decoded;
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
