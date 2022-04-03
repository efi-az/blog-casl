import { ApiProperty } from '@nestjs/swagger';
import {IsMobilePhone, IsString} from 'class-validator';
export class UserAuthDto {
  
  @IsMobilePhone('fa-IR')
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  password: string;
}
