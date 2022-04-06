import { CreatePermissionDto } from './../../dtos/permission/permission.dto';
import { PermissionEntity } from './../../entities/permission/permission.entity';
import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { PermissionService } from 'src/charity/services/permission/permission.service';

@Controller('permission')
export class PermissionController {
    constructor(private permissionService: PermissionService) {}

    @Post()
    async createPermission(@Body(ValidationPipe) createPermission: CreatePermissionDto): Promise<PermissionEntity> {
        return await this.permissionService.createPermission(createPermission)
    }


    @Get('all')
    async getAllPermission(): Promise<PermissionEntity[]> {
        return await this.permissionService.getAllPermission()
    }

    @Get(':id')
    async getOnePermission(@Param('id') permissionId: number): Promise<PermissionEntity> {
        return await this.permissionService.findById(permissionId)
    }
}