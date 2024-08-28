import { Test, TestingModule } from '@nestjs/testing';
import { UpdateQouteService } from './update-qoute.service';

describe('UpdateQouteService', () => {
  let service: UpdateQouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateQouteService],
    }).compile();

    service = module.get<UpdateQouteService>(UpdateQouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
