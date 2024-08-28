import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dio';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findCheckUniqUser(req: RegisterUserDto): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: [{ username: req.username, email: req.email }],
    });
  }
  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne(options);
  }
  async createUser(req: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(req);
  }
}
