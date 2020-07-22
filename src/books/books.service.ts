import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/shared/entities/book.entity';
import { BookDto } from 'src/shared/dtos/book.dto';
import { Reading } from 'src/shared/entities/reading.entity';
import { Session } from 'src/shared/entities/session.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        @InjectRepository(Reading)
        private readingsRepository: Repository<Reading>
    ) {}

    async findAll(): Promise<{ data: Book[] }> {
        let books = null;
        try {
            books = await this.booksRepository.find();
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return { data: books };
    }

    async findOne(id: string): Promise<{ data: Book }> {
        let book = null;
        try{
            book = await this.booksRepository.findOne(id);
            if (!book) throw new Error('Bad Request');
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return { data: book };
    }

    async addBook(book: BookDto) {
        let result = null;
        try {
            result = await this.booksRepository.save(book);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async updateBook(id: string, book: BookDto) {
        let result = null;
        try {
            result = await this.booksRepository.update(id, book);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async deleteBook(id: string) {
        let book = null;
        let result = null;
        try {
            book = await this.booksRepository.findOne(id);
            if (!book) throw new Error('Bad Request');
            result = await this.booksRepository.delete(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async findReadingsByBookId(id: string): Promise<{ data: Reading[] }> {
        let readings = null;
        try {
            readings = await this.readingsRepository
                .createQueryBuilder('reading')
                .where('reading.book = :id', { id })
                .getMany();
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return { data: readings };
    }
}
