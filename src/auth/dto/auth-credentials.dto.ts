import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}