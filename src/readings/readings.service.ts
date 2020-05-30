import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from 'src/shared/entities/reading.entity';
import { ReadingDto } from 'src/shared/dtos/reading.dto';
import { Session } from 'src/shared/entities/session.entity';
import { User } from 'src/shared/entities/user.entity';
import { Book } from 'src/shared/entities/book.entity';


@Injectable()
export class ReadingsService {
    constructor(
        @InjectRepository(Reading)
        private readingsRepository: Repository<Reading>,
        @InjectRepository(Session)
        private sessionsRepository: Repository<Session>,
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
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

    async findBooksFromUsersReadings(user: User): Promise<Book[]> {
        let readings: Reading[] = null;
        let books: Book[] = null;
        try {
            readings = await this.readingsRepository
                .createQueryBuilder('reading')
                .select(['reading.id', 'reading.book'])
                .distinctOn(['reading.book'])
                .innerJoinAndSelect('reading.book', 'book')
                .getMany();
            // Extract books from unique books in readings array
            books = readings.map(reading => reading.book);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return books;
    }

    async findOne(id: string, user: User): Promise<Reading> {
        let reading = null;
        try{
            reading = await this.readingsRepository.findOne(id, { where: { user: user.id } });
            if (!reading) throw new Error('Bad Request');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return reading;
    }

    async addReading(reading: ReadingDto) {
        let result = null;
        try {
            result = await this.readingsRepository.save(reading);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async updateReading(id: string, reading: ReadingDto) {
        let result = null;
        try {
            result = await this.readingsRepository.update(id, reading);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async deleteReading(id: string, user: User) {
        let reading = null;
        let result = null;
        try {
            reading = await this.readingsRepository.findOne(id, { where: { user: user.id } });
            if (!reading) throw new Error('Bad Request');
            result = await this.readingsRepository.delete(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    
    async findSessionsByReadingId(id: string, user: User): Promise<Reading[]> {
        let sessions = null;
        let reading = null;
        try {
            reading = await this.readingsRepository.findOne(id, { where: { user: user.id } });
            if (!reading) throw new Error('Bad Request');
            sessions = await this.sessionsRepository.find({ where: { reading: id, user: user.id } });
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return sessions;
    }
}
