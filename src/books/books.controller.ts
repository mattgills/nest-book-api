import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from 'src/entities/book.entity';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getBooks() {
        return this.booksService.findAll();
    }

    @Get(':id')
    getBook(@Param() params) {
        return this.booksService.findOne(params.id);
    }

    @Post()
    addBook(@Body() book: Book) {
        return this.booksService.addBook(book);
    }

    @Put(':id')
    updateBook(@Param() params, @Body() book: Book) {
        return this.booksService.updateBook(params.id, book);
    }

    @Delete(':id')
    deleteBook(@Param() params) {
        return this.booksService.deleteBook(params.id);
    }
}
