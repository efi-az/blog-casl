import { RoleEntity } from './../../entities/role/role.entity';
import { PermissionEntity } from './../../entities/permission/permission.entity';
import { UserAuthDto } from './../../../auth/dto/user-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../../entities/user/user.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRep: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly roleRep: Repository<RoleEntity>) {}

    async createUser(userRegisterDto: UserAuthDto): Promise<UserEntity> {
        return await this.userRep.save(userRegisterDto)
    }

    async findAllPermissionsOfUser(user: UserEntity): Promise<PermissionEntity[]> {
        const findRole = await this.roleRep.findOne({where: {name: user.role}, relations: ['obj_permissions']})

        return findRole.obj_permissions
    }

    async findOne(conditions: any): Promise<UserEntity> {
        return await this.userRep.findOne(conditions)
    }
}