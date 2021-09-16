import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credemtials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authService.signUp(signUpCredentialsDto);
    }

    @Post('/signin')
    signIN(@Body() signInCredentialsDto: SignInCredentialsDto) {
        return this.authService.signIn(signInCredentialsDto);
    }
}
