import { assignRoleToPermissionDto } from './../../dtos/role/assign-role-to-permission.dto';
import { RoleDto } from '../../dtos/role/role.dto';
import { RoleService } from '../../services/role/role.service';
import { RoleEntity } from '../../entities/role/role.entity';
import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post()
    async createRole(@Body(ValidationPipe) roleDto: RoleDto): Promise<RoleEntity> {
        return await this.roleService.createRole(roleDto)
    }

    @Get('all')
    async getAllRoles(): Promise<RoleEntity[]> {
        return await this.roleService.getAllRoles()
    }

    @Get(':id')
    async getOneRole(@Param('id') roleId: number): Promise<RoleEntity> {
        return await this.roleService.findById(roleId)
    }

    @Post('permission')
    async assignRoleToPermission(@Body(ValidationPipe) assignRoleToPermission: assignRoleToPermissionDto): Promise<any> {
        return await this.roleService.assignRoleToPermission(assignRoleToPermission)
    }
}