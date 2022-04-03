import { UserAuthDto } from './dto/user-auth.dto';
import { UserService } from './../charity/services/user/user.service';
import { UserNotFound, PasswordNotCorrect, UserAleardyExist } from './../charity/exceptions/user/user.exception';
import { UserEntity } from './../charity/entities/user/user.entity';
import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {jwtConstants} from "./constants";
import { RolesService } from '../charity/services/auth/role.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService,
                private readonly roleService: RolesService) {
    }

    async validateUser(userLoginDto: UserAuthDto): Promise<any> {
        const findUser = await this.userService.findOne({where: {phone: userLoginDto.phone}})

        if (!findUser) throw new UserNotFound()

        if (!bcrypt.compareSync(userLoginDto.password, findUser.password)) throw new PasswordNotCorrect()

        const {password, ...result} = findUser;

        return result;
    }

    async login(userLoginDto: UserAuthDto): Promise<any> {
        const user = await this.validateUser(userLoginDto)
        const payload = {userId: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerUser(userDto: UserAuthDto): Promise<any> {
        const findUser = await this.userService.findOne({where: {phone: userDto.phone}})

        if (findUser)
            throw new UserAleardyExist()

        // hashed password
        const hashPassword = bcrypt.hashSync(userDto.password, jwtConstants.salt)

        const findRole = await this.roleService.findOne({name: 'guest'})

        // create user
        const user = new UserEntity()

        user.phone = userDto.phone
        user.password = hashPassword
        user.role = findRole

        await this.userService.createUser(user)

        return {
            result: true
        }
    }
}
