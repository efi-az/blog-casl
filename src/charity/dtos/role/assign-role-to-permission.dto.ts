import { IsNumber } from "class-validator";

export class assignRoleToPermissionDto {
    @IsNumber()
    permission: number

    @IsNumber()
    role: number
}