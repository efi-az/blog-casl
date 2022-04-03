import { RoleDto } from './../../dtos/auth/role.dto';
import { RolesEntity } from './../../entities/auth/role.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RolesEntity) private readonly roleRep: Repository<RolesEntity>) {}

    async createRole(roleDto: RoleDto): Promise<RolesEntity> {
        return await this.roleRep.save(roleDto)
    }

    async findOne(condition): Promise<RolesEntity> {
        return await this.roleRep.findOne(condition)
    }
}