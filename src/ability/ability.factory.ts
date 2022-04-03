import { PermissionEntity } from './../charity/entities/auth/permission.entity';
import { UserService } from './../charity/services/user/user.service';
import { InvoiceEntity } from './../charity/entities/invoice/invoice.entity';
import { PermissionCondition, PermissionAction } from './ability.interface';
import { UserEntity } from './../charity/entities/user/user.entity';
import { Injectable } from "@nestjs/common";
import { Ability, InferSubjects } from '@casl/ability';

interface CaslPermission {
    action: PermissionAction;
    subject: string;
    conditions?: PermissionCondition;
}

export type PermissionObjectType = InferSubjects<typeof InvoiceEntity> | any;

export type AppAbility =  Ability<[PermissionAction, PermissionObjectType]>

@Injectable()
export class CaslAbilityFactory {
  constructor(private userService: UserService) {}
  async createForUser(user: UserEntity): Promise<AppAbility> {
    const dbPermissions: PermissionEntity[] = await this.userService.findAllPermissionsOfUser(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
      action: p.action,
      subject: p.obj_object.name,
      conditions: PermissionEntity.parseCondition(p.condition, user),
    }));
    return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
  }
}