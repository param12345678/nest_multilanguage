import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/models/user.entity';
import { Profile } from 'src/models/profile.entity';
import { CreateUserDto, loginDto } from 'src/user/dto/create-user.dto';
import { hash } from 'bcrypt';
import CustomError from 'src/utils/customErrors';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';


@Injectable()
export class AuthService {

  constructor(private readonly i18n: I18nService,) { }


  async createUser(user: CreateUserDto, lang: string) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new ConflictException(await this.i18n.translate('test.auth.emailAlreadyExists', { lang }));
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create a new user with hashed password
      const newUser = await User.create({ ...user, password: hashedPassword });

      // Save the new user to the database
      const createdUser = await newUser.save();

      return {
        message: await this.i18n.translate('test.auth.USER_CREATED_SUCC', { lang }),
        statusCode: HttpStatus.CREATED,
        data: createdUser,
      };
    } catch (error) {
      throw error;
    }
  }



  async login(data: loginDto, lang: string) {
    try {
      const { email, password } = data;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new UnauthorizedException(await this.i18n.translate('test.auth.NO_ACCOUNT_FOUND', { lang }));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(await this.i18n.translate('test.auth.INVALID_ID_PWD', { lang }));
      }

      const token = sign({ userId: user.id, email: user.email }, process.env.JWTKEY, { expiresIn: '30d' });
      // Omit password field from the user object
      const userData = { ...user.dataValues };
      delete userData.password;
      return {
        message: await this.i18n.translate('test.auth.LOGIN_SUCC', { lang }),
        statusCode: HttpStatus.OK,
        data: {
          user: userData,
          token,
        },
      };
    } catch (error) {

      throw error;

    }
  }


  async createUserProfile(userId: number, createProfileDto): Promise<Profile> {
    // Create user profile
    const { city, state, address } = createProfileDto
    const userProfile = await Profile.create({ userId, city, state, address });
    return userProfile;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
