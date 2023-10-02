const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696254132007 {
    name = 'initialShema1696254132007'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role" RENAME COLUMN "hello" TO "isString"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isString"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "isString" boolean NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isString"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "isString" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" RENAME COLUMN "isString" TO "hello"`);
    }
}
