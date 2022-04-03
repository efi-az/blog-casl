import { JwtAuthGuard } from './../../../auth/guard/jwt-auth.guard';
import { CaslAbilityFactory } from './../../../ability/ability.factory';
import { InvoiceEntity } from './../../entities/invoice/invoice.entity';
import { PermissionAction } from '../../../ability/ability.interface';
import { Controller, ForbiddenException, Get, Param, ParseIntPipe, Request, UseGuards } from "@nestjs/common";

@Controller("invoices")
export class InvoicesController {
  
    // constructor(private abilityFactory: CaslAbilityFactory) {}
  
    // @UseGuards(JwtAuthGuard)
    // @Get(":id")
    // async findOne(@Param("departmentId", ParseIntPipe) departmentId: number,
    //     @Param("invoiceId", ParseIntPipe) invoiceId: number, @Request() req: any): Promise<any> {
    //     const ability = await this.abilityFactory.createForUser(req.user);
    //     const condition = new InvoiceEntity();
    //     condition.departmentId = departmentId;
    //     if (ability.can(PermissionAction.READ, condition)) {
    //         throw new ForbiddenException("You dont have access to this resource!");
    //     }
    //     // get the invoice
    //     console.log(`get invoice by id ${invoiceId}`);
        
    // }
}