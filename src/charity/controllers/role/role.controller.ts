import { RoleDto } from './../../dtos/auth/role.dto';
import { RolesService } from './../../services/auth/role.service';
import { RolesEntity } from './../../entities/auth/role.entity';
import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";

@Controller('role')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    async createRole(@Body(ValidationPipe) roleDto: RoleDto): Promise<RolesEntity> {
        return await this.roleService.createRole(roleDto)
    }
}