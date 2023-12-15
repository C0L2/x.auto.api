const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1702633048431 {
    name = 'initialShema1702633048431'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_016bdd6fe0c3f358c7de59518e4" UNIQUE ("email", "numar_telefon")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_016bdd6fe0c3f358c7de59518e4"`);
    }
}
