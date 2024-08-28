import { Test, TestingModule } from '@nestjs/testing';
import { GetListQouteService } from './get-list-qoute.service';

describe('GetListQouteService', () => {
  let service: GetListQouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetListQouteService],
    }).compile();

    service = module.get<GetListQouteService>(GetListQouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
