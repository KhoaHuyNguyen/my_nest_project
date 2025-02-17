import { Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAllUser(): Promise<User[]> {
    return this.userModel.find({});
  }

  createUser(userDTO: UserDTO): Promise<User> {
    const newUser = new this.userModel(userDTO);
    return newUser.save();
  }

  updateUser(userDTO: UserDTO, id: string) {
    const result = this.userModel.findByIdAndUpdate(id, userDTO, { new: true });
    return { data: result };
  }

  deleteUser(userDTO: UserDTO, id: string) {
    const remove = this.userModel.findByIdAndDelete(id, userDTO);
    return { data: remove };
  }
}
