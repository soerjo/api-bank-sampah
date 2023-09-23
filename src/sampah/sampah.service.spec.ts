import { Test, TestingModule } from '@nestjs/testing';
import { SampahService } from './sampah.service';

describe('SampahService', () => {
  let service: SampahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampahService],
    }).compile();

    service = module.get<SampahService>(SampahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
