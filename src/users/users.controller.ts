import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getBooks() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getBook(@Param() params) {
        return this.usersService.findOne(params.id);
    }

    @Post()
    addBook(@Body() user: UserDto) {
        return this.usersService.addUser(user);
    }

    // @Put(':id')
    // updateBook(@Param() params, @Body() user: CreateUserDto) {
    //     return this.usersService.updateUser(params.id, user);
    // }

    @Delete(':id')
    deleteBook(@Param() params) {
        return this.usersService.deleteUser(params.id);
    }
}
