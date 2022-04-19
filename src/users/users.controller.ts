import { Body, Controller, Post } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { UserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    register(@Body() user: UserDTO): Promise<string> {
        return this.userService.register(user);
    }

    @Post('/login')
    loginUser(@Body() userLogin:loginDTO): Promise<{token}> {
        return this.userService.loginUser(userLogin);
    }
}
