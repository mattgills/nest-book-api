import { IsNotEmpty, IsEmpty, IsUUID, IsOptional, IsDateString } from "class-validator";
import { User } from "../entities/user.entity";
import { Book } from "../entities/book.entity";

export class ReadingDto {
    @IsEmpty()
    id: string;

    @IsNotEmpty()
    @IsDateString()
    start: Date;

    @IsOptional()
    @IsDateString()
    end: string;

    @IsNotEmpty()
    @IsUUID()
    bookId: Book;

    @IsNotEmpty()
    @IsUUID()
    userId: User;
}