import { PermissionAlreadyExist, PermissionNotFound } from './../../exceptions/permission/permission.exception';
import { CreatePermissionDto } from './../../dtos/permission/permission.dto';
import { PermissionEntity } from './../../entities/permission/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(PermissionEntity) private readonly permissionRep: Repository<PermissionEntity>) {}

    async createPermission(createPermission: CreatePermissionDto): Promise<PermissionEntity> {
        const findPermission = await this.permissionRep.findOne({where: {name: createPermission.name}})
        if (findPermission) throw new PermissionAlreadyExist()

        const permission = new PermissionEntity()
        permission.name = createPermission.name
        permission.action = createPermission.action
        permission.condition = createPermission.condition
        permission.subject = createPermission.subject
        const savedPermission = await this.permissionRep.save(createPermission) 
        return savedPermission
    }

    async findByName(name: string): Promise<PermissionEntity> {
        const findPermission = await this.permissionRep.findOne({where: {name}})
        if (!findPermission) throw new PermissionNotFound()
        return await this.permissionRep.findOne({where: {name}, relations: ['obj_roles']})
    }

    async findById(id: number): Promise<PermissionEntity> {
        const findPermission = await this.permissionRep.findOne({where: {id}})
        if (!findPermission) throw new PermissionNotFound()
        return await this.permissionRep.findOne({where: {id}, relations: ['obj_roles']})
    }

    async getAllPermission(): Promise<PermissionEntity[]> {
        return await this.permissionRep.find({})
    }
}