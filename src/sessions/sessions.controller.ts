import { Controller, Get, Param, Post, Body, Put, Delete, UseInterceptors, UseGuards, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionDto } from 'src/shared/dtos/session.dto';
import { SetUserInterceptor } from 'src/shared/interceptors/set-user.interceptor';
import { User } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppendMetadataInterceptor } from 'src/shared/interceptors/append-metadata.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@UseGuards(JwtAuthGuard)
@Controller('api/sessions')
export class SessionsController {
    constructor(private sessionsService: SessionsService) {}

    @Get()
    @UseInterceptors(AppendMetadataInterceptor)
    getSessions(@User() user) {
        return this.sessionsService.findAll(user);
    }

    @Get(':id')
    @UseInterceptors(AppendMetadataInterceptor)
    getSession(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.sessionsService.findOne(id, user);
    }

    @Post()
    @HttpCode(201)
    @UseInterceptors(SetUserInterceptor)
    addSession(@Body() session: SessionDto) {
        return this.sessionsService.addSession(session);
    }

    @Put(':id')
    @UseInterceptors(SetUserInterceptor)
    updateSession(@Param('id', ParseUUIDPipe) id: string, @Body() session: SessionDto) {
        return this.sessionsService.updateSession(id, session);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteSession(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.sessionsService.deleteSession(id, user);
    }
}
