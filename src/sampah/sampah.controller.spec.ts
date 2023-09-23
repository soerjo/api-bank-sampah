import { Test, TestingModule } from '@nestjs/testing';
import { SampahController } from './sampah.controller';
import { SampahService } from './sampah.service';

describe('SampahController', () => {
  let controller: SampahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampahController],
      providers: [SampahService],
    }).compile();

    controller = module.get<SampahController>(SampahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
