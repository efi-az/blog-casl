import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {AuthController} from "./auth.controller";
import {RolesGuard} from "./guard/roles.guard";
import { CharityModule } from 'src/charity/charity.module';

@Module({
    imports: [
        CharityModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, JwtStrategy, RolesGuard],
    controllers: [AuthController]
})
export class AuthModule {
}
