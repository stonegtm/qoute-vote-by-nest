import { Module } from '@nestjs/common';
import { QouteService } from './qoute.service';
import { QouteController } from './qoute.controller';
import { UsecasesModule } from 'src/usecases/usecases.module';

@Module({
  imports: [UsecasesModule],
  controllers: [QouteController],
  providers: [QouteService],
})
export class QouteModule {}
