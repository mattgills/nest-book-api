import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, ParseUUIDPipe, HttpCode, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/shared/dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppendMetadataInterceptor } from 'src/shared/interceptors/append-metadata.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseInterceptors(AppendMetadataInterceptor)
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseInterceptors(AppendMetadataInterceptor)
    getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.findOne(id);
    }

    @Post()
    @HttpCode(201)
    addUser(@Body() user: UserDto) {
        return this.usersService.addUser(user);
    }

    // @Put(':id')
    // updateUser(@Param() params, @Body() user: CreateUserDto) {
    //     return this.usersService.updateUser(params.id, user);
    // }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}
