const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696465485142 {
    name = 'initialShema1696465485142'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" ADD "an_fabricare" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "an_fabricare"`);
    }
}
