import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VoteEntity } from 'src/config/database/entities/vote.entity';
import { VoteQouteDto } from 'src/modules/qoute/dto/vote-qoute.dto';
import { QouteRepositoryService } from 'src/repositories/qoute-repository/qoute-repository.service';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository.service';
import { VoteRepositoryService } from 'src/repositories/vote-repository/vote-repository.service';

@Injectable()
export class VoteQouteService {
  constructor(
    private readonly qouteRepositoryService: QouteRepositoryService,
    private readonly voteRepositoryService: VoteRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}
  async execute(voteQouteDto: VoteQouteDto) {
    const qoute = await this.qouteRepositoryService.findOneOption({
      where: { id: voteQouteDto.id },
    });
    if (!qoute) {
      throw new NotFoundException('Quote not found');
    }
    const user = await this.userRepositoryService.findOne({
      where: { id: voteQouteDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existingVote = await this.voteRepositoryService.findOne({
      where: { qoute: { id: qoute.id }, user: { id: user.id } },
    });

    if (existingVote) {
      throw new ConflictException('User has already voted for this quote');
    }
    const voteEntity = new VoteEntity();
    voteEntity.qoute = qoute;
    voteEntity.user = user;
    voteEntity.voteValue = 1
    return await this.voteRepositoryService.save(voteEntity);
  }
}
