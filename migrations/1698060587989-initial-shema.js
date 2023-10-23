const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1698060587989 {
    name = 'initialShema1698060587989'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" ADD "year" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" DROP COLUMN "year"`);
    }
}
