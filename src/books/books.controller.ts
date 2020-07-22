import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, ParseUUIDPipe, HttpCode, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from 'src/shared/dtos/book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppendMetadataInterceptor } from 'src/shared/interceptors/append-metadata.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('api/books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    @UseInterceptors(AppendMetadataInterceptor)
    getBooks() {
        return this.booksService.findAll();
    }

    @Get(':id')
    @UseInterceptors(AppendMetadataInterceptor)
    getBook(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.findOne(id);
    }

    @Post()
    @HttpCode(201)
    addBook(@Body() book: BookDto) {
        return this.booksService.addBook(book);
    }

    @Put(':id')
    updateBook(@Param('id', ParseUUIDPipe) id: string, @Body() book: BookDto) {
        return this.booksService.updateBook(id, book);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteBook(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.deleteBook(id);
    }

    @Get(':id/readings')
    @UseInterceptors(AppendMetadataInterceptor)
    getReadingsForBook(@Param('id', ParseUUIDPipe) id: string) {
        return this.booksService.findReadingsByBookId(id);
    }
}
