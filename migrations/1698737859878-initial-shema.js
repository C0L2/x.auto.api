const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1698737859878 {
    name = 'initialShema1698737859878'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "assigned_services" DROP COLUMN "report_id"`);
        await queryRunner.query(`ALTER TABLE "assigned_services" ADD "report_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assigned_services" ADD CONSTRAINT "FK_20112e71ce9519f8aab232c4220" FOREIGN KEY ("report_id") REFERENCES "worker_report"("report_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "assigned_services" DROP CONSTRAINT "FK_20112e71ce9519f8aab232c4220"`);
        await queryRunner.query(`ALTER TABLE "assigned_services" DROP COLUMN "report_id"`);
        await queryRunner.query(`ALTER TABLE "assigned_services" ADD "report_id" character varying NOT NULL`);
    }
}
