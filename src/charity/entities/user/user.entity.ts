import { RoleEntity } from './../role/role.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @ManyToOne(() => RoleEntity, role => role.obj_user)
    role: RoleEntity

    @OneToMany(() => BlogEntity, blog => blog.obj_user)
    obj_blogs: BlogEntity
}