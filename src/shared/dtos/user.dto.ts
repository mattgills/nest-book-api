import { IsEmail, IsNotEmpty, IsEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    @IsEmpty()
    id: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}