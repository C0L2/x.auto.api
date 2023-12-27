import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InvoiceService } from "./invoice.service";

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
    constructor(private invService: InvoiceService) { }

    @Post(':report_id')
    createInvoice(@Param('report_id') report_id: number) {
        return this.invService.createInvoice(report_id)
    }

}