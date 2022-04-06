import { BlogEntity } from './../charity/entities/blog/blog.entity';
import { PermissionEntity } from './../charity/entities/permission/permission.entity';
import { UserService } from './../charity/services/user/user.service';
import { PermissionCondition, PermissionAction } from './ability.interface';
import { UserEntity } from './../charity/entities/user/user.entity';
import { Injectable } from "@nestjs/common";
import { Ability, InferSubjects } from '@casl/ability';

interface CaslPermission {
    action: PermissionAction;
    subject: string;
    conditions?: PermissionCondition;
}

export type PermissionObjectType = InferSubjects<typeof BlogEntity> | any;

export type AppAbility =  Ability<[PermissionAction, PermissionObjectType]>

@Injectable()
export class CaslAbilityFactory {
  constructor(private userService: UserService) {}
  async createForUser(user: UserEntity): Promise<AppAbility> {
    const dbPermissions: PermissionEntity[] = await this.userService.findAllPermissionsOfUser(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
      action: p.action,
      subject: p.subject,
      conditions: PermissionEntity.parseCondition(p.condition, user),
    }));
    return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
  }
}