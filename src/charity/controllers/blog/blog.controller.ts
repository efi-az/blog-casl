import { CreateBlogDto } from './../../dtos/blog/blog.dto';
import { BlogEntity } from './../../entities/blog/blog.entity';
import { PermissionsGuard } from '../../../ability/ability.guard';
import { CheckPermissions } from '../../../ability/ability.decorator';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { PermissionAction } from '../../../ability/ability.interface';
import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { BlogService } from 'src/charity/services/blog/blog.service';

@Controller("blog")
export class BlogController {
  
    constructor(private blogService: BlogService) {}
  
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @CheckPermissions([PermissionAction.CREATE, BlogEntity])
    @Post()
    async createBlog(@Body(ValidationPipe) createBlog: CreateBlogDto, @Req() req: any): Promise<any> {
        return await this.blogService.createBlog(createBlog, req.user)
    }

    @Get('all')
    async findAll(): Promise<BlogEntity[]> {
        return await this.blogService.findAll()
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, BlogEntity])
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) blogId: number): Promise<any> {
        return await this.blogService.findOne(blogId)
    }
}