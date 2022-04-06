import { assignRoleToPermissionDto } from './../../dtos/role/assign-role-to-permission.dto';
import { RoleAlreadyExist, RoleNotFound } from './../../exceptions/role/role.exception';
import { RoleEntity } from './../../entities/role/role.entity';
import { RoleDto } from '../../dtos/role/role.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { PermissionEntity } from 'src/charity/entities/permission/permission.entity';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(RoleEntity) private readonly roleRep: Repository<RoleEntity>,
                @InjectRepository(PermissionEntity) private readonly permissionRep: Repository<PermissionEntity>,
                private permissionService: PermissionService) {}

    async createRole(roleDto: RoleDto): Promise<RoleEntity> {
        const findRole = await this.roleRep.findOne({where: {name: roleDto.name}})
        if (findRole) throw new RoleAlreadyExist()
        return await this.roleRep.save(roleDto)
    }

    async findByName(name: string): Promise<RoleEntity> {
        const findRole = await this.roleRep.findOne({where: {name}})
        if (!findRole) throw new RoleNotFound()
        return await this.roleRep.findOne({where: {name}, relations: ['obj_permissions']})
    }

    async findById(id: number): Promise<RoleEntity> {
        const findRole = await this.roleRep.findOne({where: {id}})
        if (!findRole) throw new RoleNotFound()
        return await this.roleRep.findOne({where: {id}, relations: ['obj_permissions']})
    }

    async getAllRoles(): Promise<RoleEntity[]> {
        return await this.roleRep.find({})
    }

    async assignRoleToPermission(assignRoleToPermission: assignRoleToPermissionDto): Promise<any> {
        const findRole = await this.findById(assignRoleToPermission.role)

        const findPermission = await this.permissionService.findById(assignRoleToPermission.permission)

        findRole.obj_permissions.push(findPermission)
        await this.roleRep.save(findRole)

        findPermission.obj_roles.push(findRole)
        await this.permissionRep.save(findPermission)

        return {
            result: true
        }
    }
}