import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}
    signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
        return this.userRepository.signUp(userCredentialsDto);
    }
}
