import { PermissionEntity } from './../permission/permission.entity';
import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number
    
    @Column()
    name: string

    @ManyToMany(() => PermissionEntity, permission => permission.obj_roles)
    obj_permissions: PermissionEntity[]

    @OneToMany(() => UserEntity, user => user.role)
    obj_user: UserEntity[]
    
}