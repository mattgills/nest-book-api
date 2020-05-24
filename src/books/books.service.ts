import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { BookDto } from 'src/dtos/book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {}

    async findAll(): Promise<Book[]> {
        let books = null;
        try {
            books = await this.booksRepository.find();
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return books;
    }

    async findOne(id: string): Promise<Book> {
        let book = null;
        try{
            book = await this.booksRepository.findOne(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return book;
    }

    async addBook(book: BookDto) {
        let result = null;
        try {
            //if (book.id) delete book.id;
            result = await this.booksRepository.save(book);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async updateBook(id: string, book: BookDto) {
        let result = null;
        try {
            //if (book.id) delete book.id;
            result = await this.booksRepository.update(id, book);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async deleteBook(id: string) {
        let result = null;
        try {
            result = await this.booksRepository.delete(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}
