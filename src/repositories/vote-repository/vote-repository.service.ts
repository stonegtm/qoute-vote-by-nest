import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteEntity } from 'src/config/database/entities/vote.entity';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class VoteRepositoryService {
  constructor(
    @InjectRepository(VoteEntity)
    private readonly voteRepository: Repository<VoteEntity>,
  ) {}

  async findOne(options: FindOneOptions<VoteEntity>): Promise<VoteEntity> {
    return await this.voteRepository.findOne(options);
  }
  async save(req: VoteEntity): Promise<VoteEntity> {
    return await this.voteRepository.save(req);
  }
}
