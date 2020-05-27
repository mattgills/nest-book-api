import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
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

    @Get(':id')
    getReading(@Param() params, @User() user) {
        return this.readingsService.findOne(params.id, user);
    }

    @UseInterceptors(SetUserInterceptor)
    @Post()
    addReading(@Body() reading: ReadingDto) {
        return this.readingsService.addReading(reading);
    }

    @UseInterceptors(SetUserInterceptor)
    @Put(':id')
    updateReading(@Param() params, @Body() reading: ReadingDto) {
        return this.readingsService.updateReading(params.id, reading);
    }

    @Delete(':id')
    deleteReading(@Param() params, @User() user) {
        return this.readingsService.deleteReading(params.id, user);
    }

    @Get(':id/sessions')
    getReadingsForBook(@Param() params, @User() user) {
        return this.readingsService.findSessionsByReadingId(params.id, user);
    }
}
