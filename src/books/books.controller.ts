import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from 'src/shared/dtos/book.dto';
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
    getBook(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.findOne(id);
    }

    @Post()
    addBook(@Body() book: BookDto) {
        return this.booksService.addBook(book);
    }

    @Put(':id')
    updateBook(@Param('id', ParseUUIDPipe) id: string, @Body() book: BookDto) {
        return this.booksService.updateBook(id, book);
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.deleteBook(id);
    }

    @Get(':id/readings')
    getReadingsForBook(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.findReadingsByBookId(id);
    }
}
