import { IsEmail, IsNotEmpty, IsEmpty } from "class-validator";

export class UserDto {
    @IsEmpty()
    id: string;
    
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;
}