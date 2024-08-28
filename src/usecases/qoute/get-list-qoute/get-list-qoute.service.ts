import { Injectable } from '@nestjs/common';
import { QouteRepositoryService } from 'src/repositories/qoute-repository/qoute-repository.service';

@Injectable()
export class GetListQouteService {
  constructor(
    private readonly qouteRepositoryService: QouteRepositoryService,
  ) {}
  async execute(
    sortBy: string = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filter: { [key: string]: any } = {},
    search: string = '',
  ) {
    const queryBuilder =
      await this.qouteRepositoryService.createQueryBuilder('qoute');

    queryBuilder
      .leftJoin('qoute.votes', 'vote')
      .select('qoute.id', 'id')
      .addSelect('qoute.qoute', 'qoute')
      .addSelect('COUNT(vote.id)', 'voteCount')
      .groupBy('qoute.id')
      .addGroupBy('qoute.qoute');

    if (search) {
      queryBuilder.andWhere('qoute.qoute LIKE :search', {
        search: `%${search}%`,
      });
    }

    for (const [key, value] of Object.entries(filter)) {
      if (key === 'voteCount' && value.hasOwnProperty('cond')) {
        const { cond, value: voteValue } = value;
        switch (cond) {
          case 'equal':
            queryBuilder.having('COUNT(vote.id) = :voteValue', { voteValue });
            break;
          case 'lessThan':
            queryBuilder.having('COUNT(vote.id) < :voteValue', { voteValue });
            break;
          case 'greaterThan':
            queryBuilder.having('COUNT(vote.id) > :voteValue', { voteValue });
            break;
          default:
            throw new Error('Invalid condition for voteCount');
        }
      } else {
        queryBuilder.andWhere(`qoute.${key} = :${key}`, { [key]: value });
      }
    }

    queryBuilder.orderBy(`qoute.${sortBy}`, sortOrder);

    return queryBuilder.getRawMany();
  }
}
