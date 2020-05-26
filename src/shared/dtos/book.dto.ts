import { IsNotEmpty, IsArray, Min, IsEnum, IsOptional, MinLength, MaxLength, IsEmpty } from "class-validator";
import { MediaType } from "src/shared/entities/book.entity";

export class BookDto {
    @IsEmpty()
    id: string;

    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty({ each: true })
    authors: string[];

    @IsOptional()
    @MinLength(10)
    @MaxLength(10)
    isbn: string

    @IsOptional()
    @MinLength(13)
    @MaxLength(13)
    isbn13: string
    
    @IsOptional()
    publisher: string

    @IsOptional()
    edition: string

    @IsOptional()
    @Min(0)
    length: number;

    @IsNotEmpty()
    @IsEnum(MediaType)
    media: MediaType;
}