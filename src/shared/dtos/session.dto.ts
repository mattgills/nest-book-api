import { IsNotEmpty, IsEmpty, IsUUID, IsOptional } from "class-validator";
import { Reading } from "../entities/reading.entity";
import { User } from "../entities/user.entity";

export class SessionDto {
    @IsEmpty()
    id: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    quantity: number;

    @IsOptional()
    notes: string;

    @IsNotEmpty()
    @IsUUID()
    readingId: Reading;

    @IsNotEmpty()
    @IsUUID()
    userId: User;
}