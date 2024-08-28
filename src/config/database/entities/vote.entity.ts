// vote/vote.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { QouteEntity } from './qoute.entity';
import { UserEntity } from './user.entity';
import { DefaultEntity } from './default.entity';

@Entity({ name: 'vote' })
@Unique(['user', 'qoute'])
export class VoteEntity extends DefaultEntity {

  @ManyToOne(() => QouteEntity, (qoute) => qoute.votes, { eager: true })
  qoute: QouteEntity;

  @ManyToOne(() => UserEntity, (user) => user.votes, { eager: true })
  user: UserEntity;

  @Column({ type: 'int' })
  voteValue: number;
}
