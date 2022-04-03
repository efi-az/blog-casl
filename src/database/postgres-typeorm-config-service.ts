import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class PostgresTypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
    
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const configs: TypeOrmModuleOptions = {
            type: 'postgres',
            database: this.configService.get<string>('orm.database'),
            username: this.configService.get<string>('orm.username'),
            password: this.configService.get<string>('orm.password'),
            port: this.configService.get<number>('orm.port'),
            host: this.configService.get<string>('orm.host'),
            entities: this.configService.get<string[]>('orm.entities'),
            synchronize: this.configService.get<boolean>('orm.synchronize'),
            autoLoadEntities: this.configService.get<boolean>('orm.autoLoadEntities')
        }
        return configs
    }

}