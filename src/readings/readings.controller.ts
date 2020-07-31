import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, UseInterceptors, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReadingsService } from './readings.service';
import { ReadingDto } from 'src/shared/dtos/reading.dto';
import { SetUserInterceptor } from 'src/shared/interceptors/set-user.interceptor';
import { User } from 'src/shared/decorators/user.decorator';
import { AppendMetadataInterceptor } from 'src/shared/interceptors/append-metadata.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('readings')
@UseGuards(JwtAuthGuard)
@Controller('api/readings')
export class ReadingsController {
    constructor(private readingsService: ReadingsService) {}

    @Get()
    @UseInterceptors(AppendMetadataInterceptor)
    getReadings(@User() user) {
        return this.readingsService.findAll(user);
    }

    @Get('books')
    @UseInterceptors(AppendMetadataInterceptor)
    getBooksForUser(@User() user) {
        return this.readingsService.findBooksFromUsersReadings(user);
    }

    @Get(':id')
    @UseInterceptors(AppendMetadataInterceptor)
    getReading(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.readingsService.findOne(id, user);
    }

    @Post()
    @HttpCode(201)
    @UseInterceptors(SetUserInterceptor)
    addReading(@Body() reading: ReadingDto) {
        return this.readingsService.addReading(reading);
    }

    @Put(':id')
    @UseInterceptors(SetUserInterceptor)
    updateReading(@Param('id', ParseUUIDPipe) id: string, @Body() reading: ReadingDto) {
        return this.readingsService.updateReading(id, reading);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteReading(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.readingsService.deleteReading(id, user);
    }

    @Get(':id/sessions')
    @UseInterceptors(AppendMetadataInterceptor)
    getReadingsForBook(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.readingsService.findSessionsByReadingId(id, user);
    }
}
