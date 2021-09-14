import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private userRepository: UserRepository){}

    @Post('/signup')
    signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<void>{
        return this.userRepository.signUp(userCredentialsDto);
    }
}
