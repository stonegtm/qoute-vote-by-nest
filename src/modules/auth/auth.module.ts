import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/guard/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsecasesModule } from 'src/usecases/usecases.module';

@Module({
  imports: [
    UsecasesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'qoute168', // Use an environment variable for the secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
