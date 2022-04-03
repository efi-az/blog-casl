import { AbilityModule } from './../ability/ability.module';
import { InvoicesController } from './controllers/invoice/invoice.controller';
import { ObjectEntity } from './entities/auth/object.entity';
import { InvoiceEntity } from './entities/invoice/invoice.entity';
import { RolesService } from './services/auth/role.service';
import { RolesController } from './controllers/role/role.controller';
import { PermissionEntity } from './entities/auth/permission.entity';
import { RolesEntity } from './entities/auth/role.entity';
import { UserEntity } from './entities/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user/user.service';
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RolesEntity, PermissionEntity, InvoiceEntity, ObjectEntity]),
        AbilityModule
    ],
    providers: [UserService, RolesService],
    controllers: [RolesController],
    exports: [UserService, RolesService]
})
export class CharityModule {

}