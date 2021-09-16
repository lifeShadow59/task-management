import { Body, Controller, Post, Req, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credemtials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService,) { }

    @Post('/signup')
    signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authService.signUp(signUpCredentialsDto);
    }

    @Post('/signin')
    signIN(@Body() signInCredentialsDto: SignInCredentialsDto, @Req() request: Request): Promise<{ accessToken: string } | void> {
        return this.authService.signIn(signInCredentialsDto);
    }
}
