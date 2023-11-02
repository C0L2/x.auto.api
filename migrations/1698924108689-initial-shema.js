const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1698924108689 {
    name = 'initialShema1698924108689'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker_report" ADD CONSTRAINT "FK_3758629b6563a12f4c84abe8b99" FOREIGN KEY ("worker_id") REFERENCES "worker"("worker_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worker_report" ADD CONSTRAINT "FK_c60d76bc0db998d77fc5eae93d1" FOREIGN KEY ("car_id") REFERENCES "masini"("car_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker_report" DROP CONSTRAINT "FK_c60d76bc0db998d77fc5eae93d1"`);
        await queryRunner.query(`ALTER TABLE "worker_report" DROP CONSTRAINT "FK_3758629b6563a12f4c84abe8b99"`);
    }
}
