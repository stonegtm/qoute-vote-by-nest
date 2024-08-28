import { Injectable } from '@nestjs/common';
import { CreateQouteDto } from './dto/create-qoute.dto';
import { UpdateQouteDto } from './dto/update-qoute.dto';
import { CreateQouteService } from 'src/usecases/qoute/create-qoute/create-qoute.service';
import { UpdateQouteService } from 'src/usecases/qoute/update-qoute/update-qoute.service';
import { DeleteQouteService } from 'src/usecases/qoute/delete-qoute/delete-qoute.service';
import { QouteEntity } from 'src/config/database/entities/qoute.entity';
import { GetListQouteService } from 'src/usecases/qoute/get-list-qoute/get-list-qoute.service';
import { VoteQouteService } from 'src/usecases/qoute/vote-qoute/vote-qoute.service';
import { VoteQouteDto } from './dto/vote-qoute.dto';

@Injectable()
export class QouteService {
  constructor(
    private readonly createQouteService: CreateQouteService,
    private readonly updateQouteService: UpdateQouteService,
    private readonly deleteQouteService: DeleteQouteService,
    private readonly getListQouteService: GetListQouteService,
    private readonly voteQouteService: VoteQouteService,
  ) {}
  async create(createQouteDto: CreateQouteDto) {
    try {
      return await this.createQouteService.execute(createQouteDto);
    } catch (error) {
      throw error;
    }
  }
  async updateQoute(id: string, updateQouteDto: UpdateQouteDto) {
    try {
      return await this.updateQouteService.execute(id, updateQouteDto);
    } catch (error) {
      throw error;
    }
  }
  async deleteQoute(id: string) {
    try {
      return await this.deleteQouteService.execute(id);
    } catch (error) {
      throw error;
    }
  }
  findQoute(
    sortBy: string = 'id', // Default sort by ID
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filter: { [key: string]: any } = {},
    search: string = '',
  ) {
    try {
      return this.getListQouteService.execute(
        sortBy,
        sortOrder,
        filter,
        search,
      );
    } catch (error) {
      throw error;
    }
  }
  voteQoute(voteQouteDto: VoteQouteDto) {
    try {
      return this.voteQouteService.execute(voteQouteDto);
    } catch (error) {
      throw error;
    }
  }
}
