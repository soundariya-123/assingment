import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe.skip('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
