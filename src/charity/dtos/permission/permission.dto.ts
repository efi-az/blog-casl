import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { PermissionAction } from './../../../ability/ability.interface';
export class CreatePermissionDto {
    @IsString()
    name: string
    
    @IsEnum(PermissionAction)
    action: PermissionAction

    @IsString()
    subject: string

    @IsOptional()
    @IsObject()
    condition: string | null
}