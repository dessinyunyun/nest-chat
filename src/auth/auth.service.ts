import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Users } from '../schemas/users.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { username, password } = loginAuthDto;
      const validateUser = await this.validateUser(username, password);

      if (!validateUser) {
        throw new HttpException(
          'Wrong email or password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const acces_token = await this.createAccessToken(validateUser);

      return {
        message: 'berhasil login',
        username,
        accesToken: acces_token,
        id: validateUser._id,
        isAuthenticated: true,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(registerUserDto: RegisterAuthDto) {
    const user = await this.userService.findOne(registerUserDto.username);
    if (user) {
      throw new HttpException(
        'this username exist, change username',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);
    const createOne = await this.userService.createOne({
      username: registerUserDto.username,
      password: hash,
    });
    if (createOne) {
      const payload = {
        username: createOne.username,
        sub: createOne._id,
      };
      return {
        username: registerUserDto.username,
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  async createAccessToken(user: Users): Promise<string> {
    const payload = {
      sub: user.username,
    };
    const acces_token = await this.jwtService.signAsync(payload);
    return acces_token;
  }

  async validateUser(username: any, password: string): Promise<any> {
    try {
      const findUser = await this.userService.findOne(username);

      if (!findUser) {
        throw new HttpException(
          'username tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }

      const validPass = bcrypt.compareSync(password, findUser.password);
      if (!validPass) {
        throw new HttpException('password salah', HttpStatus.BAD_REQUEST);
      }

      return findUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateAuthentication(token: string): Promise<void> {
    try {
      await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
