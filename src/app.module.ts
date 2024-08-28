import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModules } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { DatabaseExceptionFilter } from './interceptor/database-exception.filter';
import { HttpExceptionFilter } from './interceptor/http-exception.filter';
import { QouteModule } from './modules/qoute/qoute.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { RepositoryModule } from './repositories/repository.module';
import { UsecasesModule } from './usecases/usecases.module';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
  imports: [
    UsecasesModule,
    RepositoryModule,
    DatabaseModules,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    QouteModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'qoute168', // Use a secure key in production
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
