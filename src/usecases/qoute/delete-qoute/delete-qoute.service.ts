import { BadRequestException, Injectable } from '@nestjs/common';
import { QouteRepositoryService } from 'src/repositories/qoute-repository/qoute-repository.service';

@Injectable()
export class DeleteQouteService {
  constructor(
    private readonly qouteRepositoryService: QouteRepositoryService,
  ) {}
  async execute(id: string) {
    const findQoute = await this.qouteRepositoryService.findOne(id);
    if (!findQoute) {
      throw new BadRequestException();
    }
  }
}
