import { Test, TestingModule } from '@nestjs/testing';
import { CreateQouteService } from './create-qoute.service';

describe('CreateQouteService', () => {
  let service: CreateQouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateQouteService],
    }).compile();

    service = module.get<CreateQouteService>(CreateQouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
