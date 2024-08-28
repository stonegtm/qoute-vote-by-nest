import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
  
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> {
      const now = Date.now();
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
  
      return next.handle().pipe(
        tap(() => {
          const elapsed = Date.now() - now;
          this.logger.log(`HTTP ${method} ${url} took ${elapsed}ms`);
        }),
      );
    }
  }
  