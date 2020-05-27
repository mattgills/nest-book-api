import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReadingsService } from './readings.service';
import { ReadingDto } from 'src/shared/dtos/reading.dto';
import { SetUserInterceptor } from 'src/shared/interceptors/set-user.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('api/readings')
export class ReadingsController {
    constructor(private readingsService: ReadingsService) {}

    @Get()
    getReadings() {
        return this.readingsService.findAll();
    }

    @Get(':id')
    getReading(@Param() params) {
        return this.readingsService.findOne(params.id);
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
    deleteReading(@Param() params) {
        return this.readingsService.deleteReading(params.id);
    }

    @Get(':id/sessions')
    getReadingsForBook(@Param() params) {
        return this.readingsService.findSessionsByReadingId(params.id);
    }
}
