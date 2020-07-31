import { IsNotEmpty, IsArray, Min, IsEnum, IsOptional, MinLength, MaxLength, IsEmpty } from "class-validator";
import { MediaType } from "src/shared/entities/book.entity";
import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
    @ApiProperty()
    @IsEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty({ each: true })
    authors: string[];

    @ApiProperty()
    @IsOptional()
    @MinLength(10)
    @MaxLength(10)
    isbn: string

    @ApiProperty()
    @IsOptional()
    @MinLength(13)
    @MaxLength(13)
    isbn13: string
    
    @ApiProperty()
    @IsOptional()
    publisher: string

    @ApiProperty()
    @IsOptional()
    edition: string

    @ApiProperty()
    @IsOptional()
    @Min(0)
    length: number;

    @ApiProperty({ enum: MediaType })
    @IsNotEmpty()
    @IsEnum(MediaType)
    media: MediaType;
}