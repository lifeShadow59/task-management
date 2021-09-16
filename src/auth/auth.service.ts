import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SignInCredentialsDto } from './dto/signin-credemtials.dto';
import * as bcrypt from 'bcrypt';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { throwError } from 'rxjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository) { }

    signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authRepository.signUp(signUpCredentialsDto);
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto) {
        const { email, password } = signInCredentialsDto;
        const _user: SignUpCredentialsDto = await this.authRepository.findOne({ email });
        if (_user && (bcrypt.compare(password, _user.password))) {
            console.log("yes");
        }
        else {
            throw new UnauthorizedException('Password Not Match');
        }
    }
}
