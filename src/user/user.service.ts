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

  async createUser(user: CreateUserDto, lang: string) {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new ConflictException(await this.i18n.translate('test.auth.emailAlreadyExists', { lang }));
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create a new user with hashed password
      const newUser = await this.userRepository.create({ ...user, password: hashedPassword });

      // Save the new user to the database
      const createdUser = await newUser.save();

      return {
        message: await this.i18n.translate('test.auth.registeredSuccessfully', { lang }),
        statusCode: HttpStatus.CREATED,
        data: createdUser,
      };
    } catch (error) {
      let errorMessage = await this.i18n.translate('test.auth.failedToCreateUser', { lang });
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (error instanceof ConflictException) {
        errorMessage = error.message;
        statusCode = HttpStatus.CONFLICT;
      }

      return {
        message: errorMessage,
        statusCode,
        data: null,
      };
    }
  }

  async login(data: loginDto, lang: string) {
    try {
      const { email, password } = data;
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new UnauthorizedException(await this.i18n.translate('test.auth.emailNotRegistered', { lang }));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(await this.i18n.translate('test.auth.passwordDoesNotMatch', { lang }));
      }

      const token = sign({ userId: user.id, email: user.email }, process.env.JWTKEY, { expiresIn: '30d' });
      // Omit password field from the user object
      const userData = { ...user.dataValues };
      delete userData.password;
      return {
        message: await this.i18n.translate('test.auth.loginSuccess', { lang }),
        statusCode: HttpStatus.OK,
        data: {
          user: userData,
          token,
        },
      };
    } catch (error) {
      let errorMessage = await this.i18n.translate('test.auth.loginFailed', { lang });
      let statusCode = HttpStatus.UNAUTHORIZED; // Unauthorized status code

      // Determine specific error types and customize error message and status code accordingly
      if (error instanceof UnauthorizedException) {
        errorMessage = error.message;
      }

      return {
        message: errorMessage,
        statusCode,
        data: null,
      };
    }
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


