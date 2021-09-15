import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    const { userName, email, password } = userCredentialsDto;
    const user: User = this.create({
      userName,
      email,
      password,
    });
    try {
      await this.save(user);
    } catch (error) {
        console.log(error.detail.find('userName'));
      if(error.code == 23505){
          throw new ConflictException(error.detail);
      }
    }
  }
}
