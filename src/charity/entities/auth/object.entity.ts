import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";

@Entity('objects')
export class ObjectEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column()
    name: string

    @OneToMany(() => PermissionEntity, permission => permission.obj_object)
    obj_permissions: PermissionEntity[]
}