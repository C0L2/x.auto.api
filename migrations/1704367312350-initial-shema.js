const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1704367312350 {
    name = 'initialShema1704367312350'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" ADD "description" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "description"`);
    }
}
