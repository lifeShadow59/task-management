import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInCredentialsDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}