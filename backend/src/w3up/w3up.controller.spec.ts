import { Test, TestingModule } from '@nestjs/testing';
import { W3upController } from './w3up.controller';

describe('W3upController', () => {
  let controller: W3upController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [W3upController],
    }).compile();

    controller = module.get<W3upController>(W3upController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
