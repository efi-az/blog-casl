import { UserEntity } from './../user/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";

@Entity('roles')
export class RolesEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number
    
    @Column()
    name: string

    @ManyToMany(() => PermissionEntity, permission => permission.obj_roles)
    obj_permissions: PermissionEntity[]

    @OneToMany(() => UserEntity, user => user.role)
    obj_user: UserEntity[]
}