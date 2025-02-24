import { Test, TestingModule } from '@nestjs/testing';
import { PaddleController } from './paddle.controller';
import { PaddleService } from './paddle.service';

describe('PaddleController', () => {
  let controller: PaddleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaddleController],
      providers: [PaddleService],
    }).compile();

    controller = module.get<PaddleController>(PaddleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
