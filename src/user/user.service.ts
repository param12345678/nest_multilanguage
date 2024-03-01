import { Injectable, Inject, ConflictException, HttpStatus, UnauthorizedException } from '@nestjs/common';
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

  async createUser(user: CreateUserDto) {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create a new user with hashed password
      const newUser = await this.userRepository.create({ ...user, password: hashedPassword });

      // Save the new user to the database
      const createdUser = await newUser.save();

      return {
        message: globalMsg.auth.REGISTERED_SUCCESSFULLY,
        statusCode: HttpStatus.CREATED,
        data: createdUser,
      };
    } catch (error) {
      let errorMessage = 'Failed to create user';
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

  async login(data: loginDto) {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email not registered');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password does not match');
    }

    const token = sign({ userId: user.id, email: user.email }, process.env.JWTKEY, { expiresIn: '30d' });
    // Omit password field from the user object
    const userData = { ...user.dataValues };
    delete userData.password;
    return {
      message: this.i18n.translate(`test.auth.loginSuccess`),
      statusCode: HttpStatus.OK,
      data: {
        user: userData,
        token,
      },
    };
  }


}


