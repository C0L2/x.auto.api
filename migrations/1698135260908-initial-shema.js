const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1698135260908 {
    name = 'initialShema1698135260908'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_ef0531b9789b488593690ab8d5d"`);
        await queryRunner.query(`ALTER TABLE "worker_report" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "reportReportId" integer`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_78cd5cd6dd43e1aa6a6bcec59b9" FOREIGN KEY ("reportReportId") REFERENCES "worker_report"("report_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_78cd5cd6dd43e1aa6a6bcec59b9"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "reportReportId"`);
        await queryRunner.query(`ALTER TABLE "worker_report" ADD "service_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_ef0531b9789b488593690ab8d5d" FOREIGN KEY ("service_id") REFERENCES "worker_report"("report_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
