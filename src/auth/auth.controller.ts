import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Headers, extractLanguageFromHeader } from 'src/utils/common';

import { ResponderService } from "src/utils/responder";
import { CreateUserDto, loginDto } from 'src/user/dto/create-user.dto';

@ApiTags('Auth')
@Headers()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly responderService: ResponderService) { }



  @Post('signup')
  create(@Body() createUserDto: CreateUserDto, @Req() request) {
    const lang = extractLanguageFromHeader(request); // Use the helper function to extract language
    return this.authService.createUser(createUserDto, lang);
  }



  @Post('login')
  login(@Body() loginData: loginDto, @Req() request) {
    const lang = extractLanguageFromHeader(request); // Use the helper function to extract language
    return this.authService.login(loginData, lang);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
