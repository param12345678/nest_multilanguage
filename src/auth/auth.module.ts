import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ResponderService } from 'src/utils/responder';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ResponderService],
})
export class AuthModule { }
