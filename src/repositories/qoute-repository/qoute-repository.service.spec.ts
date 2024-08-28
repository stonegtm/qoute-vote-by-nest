import { Test, TestingModule } from '@nestjs/testing';
import { QouteRepositoryService } from './qoute-repository.service';

describe('QouteRepositoryService', () => {
  let service: QouteRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QouteRepositoryService],
    }).compile();

    service = module.get<QouteRepositoryService>(QouteRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
