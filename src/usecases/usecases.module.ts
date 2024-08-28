import { Module } from '@nestjs/common';
import { CreateQouteService } from './qoute/create-qoute/create-qoute.service';
import { RepositoryModule } from 'src/repositories/repository.module';
import { UpdateQouteService } from './qoute/update-qoute/update-qoute.service';
import { DeleteQouteService } from './qoute/delete-qoute/delete-qoute.service';
import { CreateUserService } from './user/create-user/create-user.service';
import { LoginService } from './user/login/login.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwt.strategy';
import { GetListQouteService } from './qoute/get-list-qoute/get-list-qoute.service';
import { VoteQouteService } from './qoute/vote-qoute/vote-qoute.service';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'qoute168', // Use an environment variable for the secret key
      signOptions: { expiresIn: '5h' }, // Token expiration time
    }),
  ],
  providers: [
    JwtStrategy,
    CreateQouteService,
    UpdateQouteService,
    DeleteQouteService,
    CreateUserService,
    LoginService,
    GetListQouteService,
    VoteQouteService,
  ],
  exports: [
    CreateQouteService,
    UpdateQouteService,
    DeleteQouteService,
    CreateUserService,
    LoginService,
    GetListQouteService,
    VoteQouteService,
  ],
})
export class UsecasesModule {}
