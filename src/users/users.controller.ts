import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUser(@Res({ passthrough: true }) res: Response) {
    try {
      const users = await this.userService.getAllUser();
      return { message: 'Get Data Successfully' };
    } catch (error) {
      res.status;
      return { message: error.message };
    }
  }

  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    console.log(userDTO);
    const user = await this.userService.createUser(userDTO);
    return { data: user };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() userDTO: UserDTO) {
    const user = await this.userService.updateUser(userDTO, id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Body() userDTO: UserDTO) {
    const user = await this.userService.deleteUser(userDTO, id);
  }
}
