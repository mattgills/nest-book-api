import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from 'src/shared/entities/reading.entity';
import { ReadingDto } from 'src/shared/dtos/reading.dto';
import { Session } from 'src/shared/entities/session.entity';
import { User } from 'src/shared/entities/user.entity';


@Injectable()
export class ReadingsService {
    constructor(
        @InjectRepository(Reading)
        private readingsRepository: Repository<Reading>,
        @InjectRepository(Session)
        private sessionsRepository: Repository<Session>
    ) {}

    async findAll(user: User): Promise<Reading[]> {
        let readings = null;
        try {
            readings = await this.readingsRepository.find({ where: { user: user.id } });
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return readings;
    }

    async findOne(id: string, user: User): Promise<Reading> {
        let reading = null;
        try{
            reading = await this.readingsRepository.findOne(id, { where: { user: user.id } });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        if (!reading) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        return reading;
    }

    async addReading(reading: ReadingDto) {
        let result = null;
        try {
            //if (reading.id) delete reading.id;
            result = await this.readingsRepository.save(reading);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async updateReading(id: string, reading: ReadingDto) {
        let result = null;
        try {
            //if (reading.id) delete reading.id;
            result = await this.readingsRepository.update(id, reading);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async deleteReading(id: string) {
        let result = null;
        try {
            result = await this.readingsRepository.delete(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    
    async findSessionsByReadingId(id: string): Promise<Reading[]> {
        let sessions = null;
        try {
            sessions = await this.sessionsRepository
                .createQueryBuilder('session')
                .where('session.reading = :id', { id })
                .getMany();
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return sessions;
    }
}
