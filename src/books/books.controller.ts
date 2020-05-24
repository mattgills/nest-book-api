import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from 'src/dtos/book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/books')
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
    addBook(@Body() book: BookDto) {
        return this.booksService.addBook(book);
    }

    @Put(':id')
    updateBook(@Param() params, @Body() book: BookDto) {
        return this.booksService.updateBook(params.id, book);
    }

    @Delete(':id')
    deleteBook(@Param() params) {
        return this.booksService.deleteBook(params.id);
    }
}
