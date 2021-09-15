import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UserCredentialsDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak',
    })
    password: string;
}
