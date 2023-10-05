const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696458410199 {
    name = 'initialShema1696458410199'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" ADD "client_type" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "client_type"`);
    }
}
