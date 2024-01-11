const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1704978186025 {
    name = 'initialShema1704978186025'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_016bdd6fe0c3f358c7de59518e4"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "nume_client"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "numar_telefon"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "client_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "phone_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_b9fc3c4490606bdcb65f30e7e41" UNIQUE ("email", "phone_number")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_b9fc3c4490606bdcb65f30e7e41"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "client_name"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "numar_telefon" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "nume_client" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_016bdd6fe0c3f358c7de59518e4" UNIQUE ("email", "numar_telefon")`);
    }
}
