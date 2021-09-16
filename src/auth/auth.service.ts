import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SignInCredentialsDto } from './dto/signin-credemtials.dto';

import { SignUpCredentialsDto } from './dto/signup-credentials.dto';

import { JwtPayloadInterface } from './jwt-payload.interface';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService,) { }

    signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authRepository.signUp(signUpCredentialsDto);
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string } | void> {
        const { email, password } = signInCredentialsDto;
        const _userIsAuthorized: boolean = await this.authRepository.signIn(signInCredentialsDto);
        if (_userIsAuthorized) {
            const payload: JwtPayloadInterface = { email };
            return this.generateJwtToken(payload)
        }
        return;
    }

    async generateJwtToken(jwtPayloadInterface: JwtPayloadInterface): Promise<{ accessToken: string }> {
        const accessToken: string = await this.jwtService.sign(jwtPayloadInterface);
        return { accessToken };

    }
}
