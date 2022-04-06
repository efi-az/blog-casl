import { RoleEntity } from '../../charity/entities/role/role.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEntity[]) => SetMetadata(ROLES_KEY, roles);