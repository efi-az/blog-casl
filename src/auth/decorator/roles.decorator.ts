import { RolesEntity } from '../../charity/entities/auth/role.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEntity[]) => SetMetadata(ROLES_KEY, roles);