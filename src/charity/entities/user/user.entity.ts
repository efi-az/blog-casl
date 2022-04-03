import { RolesEntity } from './../auth/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column()
    phone: string

    @Column()
    password: string

    @ManyToOne(() => RolesEntity, role => role.obj_user)
    role: RolesEntity
}