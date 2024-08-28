import { Entity, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { VoteEntity } from './vote.entity';

@Entity({ name: 'user' })
export class UserEntity extends DefaultEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  role_admin: boolean;

  @OneToMany(() => VoteEntity, (vote) => vote.user)
  votes: VoteEntity[];
}
