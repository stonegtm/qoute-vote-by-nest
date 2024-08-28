import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QouteEntity } from 'src/config/database/entities/qoute.entity';
import { QouteRepositoryService } from './qoute-repository/qoute-repository.service';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { VoteEntity } from 'src/config/database/entities/vote.entity';
import { VoteRepositoryService } from './vote-repository/vote-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([QouteEntity, UserEntity, VoteEntity])],
  providers: [
    QouteRepositoryService,
    UserRepositoryService,
    VoteRepositoryService,
  ],
  exports: [
    QouteRepositoryService,
    UserRepositoryService,
    VoteRepositoryService,
  ],
})
export class RepositoryModule {}
