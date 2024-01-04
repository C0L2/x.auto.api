const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1704364046138 {
    name = 'initialShema1704364046138'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" ADD "client" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "client"`);
    }
}
