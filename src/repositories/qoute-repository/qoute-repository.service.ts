import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QouteEntity } from 'src/config/database/entities/qoute.entity';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class QouteRepositoryService {
  constructor(
    @InjectRepository(QouteEntity)
    private readonly qouteRepository: Repository<QouteEntity>,
  ) {}

  async createQueryBuilder(
    alias: string,
  ): Promise<SelectQueryBuilder<QouteEntity>> {
    const qb = this.qouteRepository.createQueryBuilder(alias);
    return qb;
  }

  async create(req: QouteEntity): Promise<QouteEntity> {
    const qoutes = this.qouteRepository.create(req);
    return await this.qouteRepository.save(qoutes);
  }
  async findOne(id: string): Promise<QouteEntity> {
    return await this.qouteRepository.findOne({ where: { id } });
  }
  async findOneOption(
    options: FindOneOptions<QouteEntity>,
  ): Promise<QouteEntity> {
    return await this.qouteRepository.findOne(options);
  }
  async update(
    id: string,
    updateQoute: Partial<QouteEntity>,
  ): Promise<QouteEntity> {
    await this.qouteRepository.update(id, updateQoute);
    return this.findOne(id);
  }
}
