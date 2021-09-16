import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import { UserModel } from "./user.model";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { userName, email, password } = authCredentialsDto;

        const user: User = this.create({
            userName,
            email,
            password
        });

        await this.save(user);
    }
}