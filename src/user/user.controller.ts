import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { CreateUserDto, ProfileDto, loginDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers, extractLanguageFromHeader } from 'src/utils/common';
import { AuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Auth')
@Headers()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService,) { }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto, @Req() request) {
    const lang = extractLanguageFromHeader(request); // Use the helper function to extract language
    return this.userService.createUser(createUserDto, lang);
  }

  @Post('login')
  login(@Body() loginData: loginDto, @Req() request) {
    const lang = extractLanguageFromHeader(request); // Use the helper function to extract language
    return this.userService.login(loginData, lang);
  }



  @Get(':id')
  getUserById(@Param('id') id: number,) {
    return this.userService.getUserById(id);
  }

  @ApiBearerAuth('Authorization')
  @Put('profile/:id')
  @UseGuards(AuthGuard)
  async updateProfile(@Param('id') id: number, @Body() updateProfileDto: ProfileDto, @Req() request) {
    const lang = extractLanguageFromHeader(request); // Use the helper function to extract language
    return this.userService.updateProfile(id, updateProfileDto, lang);
  }


}
