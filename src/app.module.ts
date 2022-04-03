import { AbilityModule } from './ability/ability.module';
import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CharityModule } from './charity/charity.module';

@Module({
  imports: [
    ConfigModule, DatabaseModule, AuthModule, CharityModule, AbilityModule
  ],
  providers: []
}) 
export class AppModule {}
