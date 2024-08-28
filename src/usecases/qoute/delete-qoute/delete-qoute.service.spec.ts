import { Test, TestingModule } from '@nestjs/testing';
import { DeleteQouteService } from './delete-qoute.service';

describe('DeleteQouteService', () => {
  let service: DeleteQouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteQouteService],
    }).compile();

    service = module.get<DeleteQouteService>(DeleteQouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
