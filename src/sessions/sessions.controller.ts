import { Controller, Get, Param, Post, Body, Put, Delete, UseInterceptors } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionDto } from 'src/shared/dtos/session.dto';
import { SetUserInterceptor } from 'src/shared/interceptors/set-user.interceptor';

@Controller('/api/sessions')
export class SessionsController {
    constructor(private sessionsService: SessionsService) {}

    @Get()
    getSessions() {
        return this.sessionsService.findAll();
    }

    @Get(':id')
    getSession(@Param() params) {
        return this.sessionsService.findOne(params.id);
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
