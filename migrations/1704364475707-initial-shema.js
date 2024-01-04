const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1704364475707 {
    name = 'initialShema1704364475707'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "registr_date"`);
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "client"`);
        await queryRunner.query(`ALTER TABLE "programari" ADD "programare_date" TIMESTAMP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "programare_date"`);
        await queryRunner.query(`ALTER TABLE "programari" ADD "client" integer`);
        await queryRunner.query(`ALTER TABLE "programari" ADD "registr_date" TIMESTAMP NOT NULL`);
    }
}
