import { Injectable } from "@nestjs/common";
import { WorkerReportService } from "../worker-report.service";
import { SpecificReport } from "src/types";
import { convertToSpecificReport } from "../../utils/convert-object-to-specific-report"

@Injectable()
export class InvoiceService {
    constructor(private wkReport: WorkerReportService) { }

    async createInvoice(report_id: number): Promise<SpecificReport> {
        const res = await this.wkReport.getWorkerReportWithServices(report_id);
        return convertToSpecificReport(res);
    }
}