import { PermissionEntity } from './../../entities/auth/permission.entity';
import { UserAuthDto } from './../../../auth/dto/user-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../../entities/user/user.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRep: Repository<UserEntity>) {}

    async createUser(userRegisterDto: UserAuthDto): Promise<UserEntity> {
        return await this.userRep.save(userRegisterDto)
    }

    async findAllPermissionsOfUser(user: UserEntity): Promise<PermissionEntity[]> {
        return user.role.obj_permissions
    }

    async findOne(conditions): Promise<UserEntity> {
        return await this.userRep.findOne(conditions)
    }
}