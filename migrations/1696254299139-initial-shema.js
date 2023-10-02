const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696254299139 {
    name = 'initialShema1696254299139'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isString"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role" ADD "isString" boolean NOT NULL`);
    }
}
