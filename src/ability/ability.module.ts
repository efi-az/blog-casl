import { CharityModule } from './../charity/charity.module';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './ability.factory';
import { PermissionsGuard } from './ability.guard';

@Module({
    imports: [CharityModule],
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory]
})
export class AbilityModule {}
