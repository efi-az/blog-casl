import { UserEntity } from './../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog')
export class BlogEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column()
    title: string

    @ManyToOne(() => UserEntity, user => user.obj_blogs, {eager: true})
    obj_user: UserEntity
}