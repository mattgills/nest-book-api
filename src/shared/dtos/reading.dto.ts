import { IsNotEmpty, IsEmpty, IsUUID, IsOptional, IsDateString } from "class-validator";
import { User } from "../entities/user.entity";
import { Book } from "../entities/book.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ReadingDto {
    @ApiProperty()
    @IsEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    start: Date;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    end: string;

    @IsNotEmpty()
    @IsUUID()
    book: Book;

    @IsNotEmpty()
    @IsUUID()
    user: User;
}