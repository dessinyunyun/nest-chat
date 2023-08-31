import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schemas/users.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users')
    private usersModel: mongoose.Model<Users>,
  ) {}

  async findALl(): Promise<any> {
    try {
      const users = await this.usersModel.find().select('-password');
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(username: any): Promise<any> {
    try {
      const users = await this.usersModel.findOne({ username });

      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createOne(user: any): Promise<any> {
    try {
      const createOne = await this.usersModel.create(user);
      return createOne;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
