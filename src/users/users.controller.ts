import { Controller, Get, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async getUser() {
        const users = await this.userService.getAllUser()
        return { data: []};
    }

    @Get('detail')
    getDetail() {
        return 'Detail';
    }
}
