import { PermissionAction, PermissionCondition } from '../../../ability/ability.interface';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from '../role/role.entity';

@Entity('permissions')
export class PermissionEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column()
    name: string

    @Column()
    subject: string
    
    @Column({type: 'enum', enum: PermissionAction})
    action: PermissionAction

    @Column({type: 'json', nullable: true})
    condition: string

    @ManyToMany(() => RoleEntity, role => role.obj_permissions)
    @JoinTable({name: 'role_permission'})
    obj_roles: RoleEntity[]

    public static parseCondition(condition: PermissionCondition, variables: Record<string, any>): PermissionCondition {
        if (!condition) return null;
        const parsedCondition = {};
        for (const [key, rawValue] of Object.entries(condition)) {
          if (rawValue !== null && typeof rawValue === "object") {
            const value = this.parseCondition(rawValue, variables);
            parsedCondition[key] = value;
            continue;
          }
          if (typeof rawValue !== "string") {
            parsedCondition[key] = rawValue;
            continue;
          }
          // find placeholder "${}""
          const matches = /^\\${([a-zA-Z0-9]+)}$/.exec(rawValue);
          if (!matches) {
            parsedCondition[key] = rawValue;
            continue;
          }
          const value = variables[matches[1]];
          if (typeof value === "undefined") {
            throw new ReferenceError(`Variable ${name} is not defined`);
          }
          parsedCondition[key] = value;
        }
        return parsedCondition;
      }
}