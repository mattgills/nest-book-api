import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReadingsService } from './readings.service';
import { ReadingDto } from 'src/shared/dtos/reading.dto';
import { SetUserInterceptor } from 'src/shared/interceptors/set-user.interceptor';
import { User } from 'src/shared/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/readings')
export class ReadingsController {
    constructor(private readingsService: ReadingsService) {}

    @Get()
    getReadings(@User() user) {
        return this.readingsService.findAll(user);
    }

    @Get('books')
    getBooksForUser(@User() user) {
        return this.readingsService.findBooksFromUsersReadings(user);
    }

    @Get(':id')
    getReading(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.readingsService.findOne(id, user);
    }

    @UseInterceptors(SetUserInterceptor)
    @Post()
    addReading(@Body() reading: ReadingDto) {
        return this.readingsService.addReading(reading);
    }

    @UseInterceptors(SetUserInterceptor)
    @Put(':id')
    updateReading(@Param('id', ParseUUIDPipe) id: string, @Body() reading: ReadingDto) {
        return this.readingsService.updateReading(id, reading);
    }

    @Delete(':id')
    deleteReading(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.readingsService.deleteReading(id, user);
    }

    @Get(':id/sessions')
    getReadingsForBook(@Param('id', ParseUUIDPipe) id: string, @User() user) {
        return this.readingsService.findSessionsByReadingId(id, user);
    }
}
