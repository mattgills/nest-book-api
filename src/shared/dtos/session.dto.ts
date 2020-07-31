import { IsNotEmpty, IsEmpty, IsUUID, IsOptional } from "class-validator";
import { Reading } from "../entities/reading.entity";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class SessionDto {
    @ApiProperty()
    @IsEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsOptional()
    notes: string;

    @IsNotEmpty()
    @IsUUID()
    reading: Reading;

    @IsNotEmpty()
    @IsUUID()
    user: User;
}