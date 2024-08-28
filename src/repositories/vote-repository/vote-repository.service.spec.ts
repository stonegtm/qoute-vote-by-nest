import { Test, TestingModule } from '@nestjs/testing';
import { VoteRepositoryService } from './vote-repository.service';

describe('VoteRepositoryService', () => {
  let service: VoteRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteRepositoryService],
    }).compile();

    service = module.get<VoteRepositoryService>(VoteRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
