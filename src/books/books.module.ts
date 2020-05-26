import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { Book } from "src/shared/entities/book.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BooksService],
    controllers: [BooksController]
})
export class BooksModule {}