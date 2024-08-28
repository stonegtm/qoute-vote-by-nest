import { Entity, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { VoteEntity } from './vote.entity';

@Entity({ name: 'qoute' })
export class QouteEntity extends DefaultEntity {
  @Column({ type: 'varchar' })
  qoute: string;

  @Column({ type: 'int' })
  vote: number;

  @OneToMany(() => VoteEntity, (vote) => vote.qoute)
  votes: VoteEntity[];
}
