import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UsersService } from './user.service';

@Module({
  controllers: [UserController,],
  providers: [UsersService, ...userProviders,],
  exports: [UsersService]
})
export class UserModule { }
