import { Test, TestingModule } from '@nestjs/testing';
import { W3upService } from './w3up.service';

describe('W3upService', () => {
  let service: W3upService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [W3upService],
    }).compile();

    service = module.get<W3upService>(W3upService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
