import { Test, TestingModule } from '@nestjs/testing';
import { VoteQouteService } from './vote-qoute.service';

describe('VoteQouteService', () => {
  let service: VoteQouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteQouteService],
    }).compile();

    service = module.get<VoteQouteService>(VoteQouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
