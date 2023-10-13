const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1697198501989 {
    name = 'initialShema1697198501989'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker_report" ADD CONSTRAINT "UQ_c60d76bc0db998d77fc5eae93d1" UNIQUE ("car_id")`);
        await queryRunner.query(`ALTER TABLE "masini" ADD CONSTRAINT "UQ_0be5138be728c8878f54c84d2d1" UNIQUE ("car_id")`);
        await queryRunner.query(`ALTER TABLE "worker_report" ADD CONSTRAINT "FK_c60d76bc0db998d77fc5eae93d1" FOREIGN KEY ("car_id") REFERENCES "masini"("car_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "masini" ADD CONSTRAINT "FK_0be5138be728c8878f54c84d2d1" FOREIGN KEY ("car_id") REFERENCES "worker_report"("report_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" DROP CONSTRAINT "FK_0be5138be728c8878f54c84d2d1"`);
        await queryRunner.query(`ALTER TABLE "worker_report" DROP CONSTRAINT "FK_c60d76bc0db998d77fc5eae93d1"`);
        await queryRunner.query(`ALTER TABLE "masini" DROP CONSTRAINT "UQ_0be5138be728c8878f54c84d2d1"`);
        await queryRunner.query(`ALTER TABLE "worker_report" DROP CONSTRAINT "UQ_c60d76bc0db998d77fc5eae93d1"`);
    }
}
