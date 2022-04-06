import { BlogAlreadyExist, BlogNotFound } from './../../exceptions/blog/blog.exception';
import { UserEntity } from './../../entities/user/user.entity';
import { CreateBlogDto } from './../../dtos/blog/blog.dto';
import { BlogEntity } from './../../entities/blog/blog.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogEntity) private readonly blogRep: Repository<BlogEntity>,
                @InjectRepository(UserEntity) private readonly userRep: Repository<UserEntity>) {}

    async createBlog(blogDto: CreateBlogDto, user: UserEntity): Promise<BlogEntity> {
        const findBlog = await this.blogRep.findOne({where: {title: blogDto.title}})
        if(findBlog) throw new BlogAlreadyExist()
        
        const blog = new BlogEntity()
        blog.title = blog.title
        blog.obj_user = user
        const savedBlog = await this.blogRep.save(blog)

        user.obj_blogs = savedBlog
        await this.userRep.save(user)

        return savedBlog
    }

    async findOne(blogId: number): Promise<BlogEntity> {
        const findBlog = await this.blogRep.findOne({id: blogId})
        if(findBlog) throw new BlogNotFound()

        return findBlog
    }

    async findAll(): Promise<BlogEntity[]> {
        return await this.blogRep.find({})
    }
}