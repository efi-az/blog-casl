import { RoleService } from './../charity/services/role/role.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserService } from './../charity/services/user/user.service';
import { UserNotFound, PasswordNotCorrect, UserAlreadyExist } from './../charity/exceptions/user/user.exception';
import { UserEntity } from './../charity/entities/user/user.entity';
import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {jwtConstants} from "./constants";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService,
                private readonly roleService: RoleService) {
    }

    async validateUser(userLoginDto: UserAuthDto): Promise<any> {
        const findUser = await this.userService.findOne({where: {username: userLoginDto.username}})

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
        const findUser = await this.userService.findOne({where: {username: userDto.username}})

        if (findUser)
            throw new UserAlreadyExist()

        // hashed password
        const hashPassword = bcrypt.hashSync(userDto.password, jwtConstants.salt)

        const findRole = await this.roleService.findByName('guest')

        // create user
        const user = new UserEntity()

        user.username = userDto.username
        user.password = hashPassword
        user.role = findRole

        await this.userService.createUser(user)

        return {
            result: true
        }
    }
}
