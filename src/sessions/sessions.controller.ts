import { Controller, Get, Param, Post, Body, Put, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionDto } from 'src/shared/dtos/session.dto';
import { SetUserInterceptor } from 'src/shared/interceptors/set-user.interceptor';
import { User } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/sessions')
export class SessionsController {
    constructor(private sessionsService: SessionsService) {}

    @Get()
    getSessions(@User() user) {
        return this.sessionsService.findAll(user);
    }

    @Get(':id')
    getSession(@Param() params, @User() user) {
        return this.sessionsService.findOne(params.id, user);
    }

    @UseInterceptors(SetUserInterceptor)
    @Post()
    addSession(@Body() session: SessionDto) {
        return this.sessionsService.addSession(session);
    }

    @UseInterceptors(SetUserInterceptor)
    @Put(':id')
    updateSession(@Param() params, @Body() session: SessionDto) {
        return this.sessionsService.updateSession(params.id, session);
    }

    @Delete(':id')
    deleteSession(@Param() params) {
        return this.sessionsService.deleteSession(params.id);
    }
}
