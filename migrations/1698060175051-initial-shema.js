const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1698060175051 {
    name = 'initialShema1698060175051'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker_report" ADD "date" TIMESTAMP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker_report" DROP COLUMN "date"`);
    }
}
