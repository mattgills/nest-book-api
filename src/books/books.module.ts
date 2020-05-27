import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { Book } from "src/shared/entities/book.entity";
import { Reading } from "src/shared/entities/reading.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([Reading])],
    providers: [BooksService],
    controllers: [BooksController]
})
export class BooksModule {}