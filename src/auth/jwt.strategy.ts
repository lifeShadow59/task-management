import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "./auth.repository";
import { SignUpCredentialsDto } from "./dto/signup-credentials.dto";
import { JwtPayloadInterface } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
    ) {
        super({
            secretOrKey: 'abhishekDhanani',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(jwtPayloadInterface: JwtPayloadInterface): Promise<User> {
        const { email } = jwtPayloadInterface;
        const _user: User = await this.authRepository.findOne({ email });
        if (!_user) {
            throw new UnauthorizedException();
        }
        return _user;
    }
}