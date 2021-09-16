import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dto/signin-credemtials.dto';
import { JwtPayloadInterface } from './jwt-payload.interface';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {


  async signUp(userCredentialsDto: SignUpCredentialsDto): Promise<void> {
    const { userName, email, password } = userCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user: User = this.create({
      userName,
      email,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.indexOf('userName') != -1) {
          throw new ConflictException('User name not available. ');
        }
        if (error.detail.indexOf('email') != -1) {
          throw new ConflictException('Email not available. ');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<boolean> {
    const { email, password } = signInCredentialsDto;
    const _user: SignUpCredentialsDto = await this.findOne({ email });
    if (_user && (bcrypt.compare(password, _user.password))) {
      return true;
    }
    else {
      throw new UnauthorizedException('Password Not Match');
    }
  }
}
