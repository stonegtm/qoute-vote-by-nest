import { BadRequestException, Injectable } from '@nestjs/common';
import { QouteEntity } from 'src/config/database/entities/qoute.entity';
import { UpdateQouteDto } from 'src/modules/qoute/dto/update-qoute.dto';
import { QouteRepositoryService } from 'src/repositories/qoute-repository/qoute-repository.service';

@Injectable()
export class UpdateQouteService {
  constructor(
    private readonly qouteRepositoryService: QouteRepositoryService,
  ) {}
  async execute(id: string, updateQouteDto: UpdateQouteDto) {
    const findQoute = await this.qouteRepositoryService.findOne(id);
    if (!findQoute) {
      throw new BadRequestException();
    }
    const qoute = new QouteEntity();
    qoute.id = findQoute.id;
    qoute.qoute = updateQouteDto.qoute;
    return this.qouteRepositoryService.update(findQoute.id, qoute);
  }
}
