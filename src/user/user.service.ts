import { Injectable, Inject, ConflictException, HttpStatus, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants';
import { User } from 'src/models/user.entity';
import { CreateUserDto, loginDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import globalMsg from 'src/common/globalMsg';
import { sign } from 'jsonwebtoken'; // Import sign function from jsonwebtoken
import { I18nService } from 'nestjs-i18n';





@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly i18n: I18nService, // Inject I18nService

  ) {

  }


  async updateProfile(userId: number, updateProfileDto: any, lang: string) {
    try {
      console.log("uesrIddddddddd", userId)
      const user = await this.userRepository.findByPk(userId);
      if (!user) {
        const message = await this.i18n.translate('test.error.NOT_FOUND', { lang });
        return { message, statusCode: 404 };
      }

      // Update user's profile fields based on DTO
      if (updateProfileDto.name) {
        user.name = updateProfileDto.name;
      }

      // Update more fields as needed

      await user.save();

      const successMessage = await this.i18n.translate('test.user.profileUpdated', { lang });
      return { message: successMessage, statusCode: 200 };
    } catch (error) {
      // Handle any errors that might occur during the update process
      let errorMessage = await this.i18n.translate('test.user.updateFailed', { lang });
      let statusCode = 500; // Internal server error

      // Determine if the error is a specific type and customize the error message and status code accordingly
      if (error instanceof ConflictException) {
        errorMessage = await this.i18n.translate('test.error.NOT_FOUND', { lang });
        statusCode = 400; // Bad request
      }

      return { message: errorMessage, statusCode };
    }
  }

  async getUserById(userId: number): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) {
      return null
    }
    return user;
  }

}


