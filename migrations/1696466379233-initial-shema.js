const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696466379233 {
    name = 'initialShema1696466379233'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "prenume_client"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" ADD "prenume_client" character varying NOT NULL`);
    }
}
