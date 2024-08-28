import { Injectable } from '@nestjs/common';
import { QouteEntity } from 'src/config/database/entities/qoute.entity';
import { CreateQouteDto } from 'src/modules/qoute/dto/create-qoute.dto';
import { QouteRepositoryService } from 'src/repositories/qoute-repository/qoute-repository.service';

@Injectable()
export class CreateQouteService {
  constructor(
    private readonly qouteRepositoryService: QouteRepositoryService,
  ) {}

  async execute(createQouteDto: CreateQouteDto) {
    const qoute = new QouteEntity();
    qoute.qoute = createQouteDto.qoute;
    qoute.vote = 0;
    return await this.qouteRepositoryService.create(qoute);
  }
}
