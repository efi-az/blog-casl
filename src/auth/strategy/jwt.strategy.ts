import { UserService } from './../../charity/services/user/user.service';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {jwtConstants} from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOne({
            where: {id: payload.userId},
            relations: ['role']
        })
        if (!user) throw new UnauthorizedException()

        const {password, ...res} = {...user, role: user.role.name}
        return res
    }
}
