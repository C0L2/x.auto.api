const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1702908106670 {
    name = 'initialShema1702908106670'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" ADD CONSTRAINT "UQ_127ea0b19b93f04473ab414dd36" UNIQUE ("vin_code")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" DROP CONSTRAINT "UQ_127ea0b19b93f04473ab414dd36"`);
    }
}
