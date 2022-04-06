import { BlogEntity } from './entities/blog/blog.entity';
import { PermissionService } from 'src/charity/services/permission/permission.service';
import { RoleService } from './services/role/role.service';
import { RoleController } from './controllers/role/role.controller';
import { PermissionEntity } from './entities/permission/permission.entity';
import { AbilityModule } from './../ability/ability.module';
import { RoleEntity } from './entities/role/role.entity';
import { UserEntity } from './entities/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user/user.service';
import { forwardRef, Module } from "@nestjs/common";
import { PermissionController } from './controllers/permission/permission.controller';
import { BlogController } from './controllers/blog/blog.controller';
import { BlogService } from './services/blog/blog.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity, BlogEntity]),
        forwardRef(() => AbilityModule),
    ],
    providers: [UserService, RoleService, PermissionService, BlogService],
    controllers: [RoleController, BlogController, PermissionController],
    exports: [UserService, RoleService]
})
export class CharityModule {

}