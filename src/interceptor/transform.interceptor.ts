import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, { result: boolean; status: number; data?: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<{ result: boolean; status: number; data?: T }> {
    return next.handle().pipe(
      map((data) => ({
        result: true,
        status: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    );
  }
}
