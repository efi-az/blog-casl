import {Body, Controller, Get, Post, Req, UseGuards, ValidationPipe} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserAuthDto } from "./dto/user-auth.dto";

@Controller('auth')
@ApiTags('Auth User')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('register')
    async registerUser(@Body(ValidationPipe) userRegisterDto: UserAuthDto): Promise<any> {
        return await this.authService.registerUser((userRegisterDto))
    }

    @Post('login')
    async loginUser(@Body(ValidationPipe) userLoginDto: UserAuthDto): Promise<any> {
        return await this.authService.login(userLoginDto)
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Req() req) {
        return {
            result: req.user
        }
    }

}