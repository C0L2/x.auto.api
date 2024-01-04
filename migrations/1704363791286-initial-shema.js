const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1704363791286 {
    name = 'initialShema1704363791286'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" ADD "client_id" integer`);
        await queryRunner.query(`ALTER TABLE "programari" ADD CONSTRAINT "FK_20cb6a24c17c569b109a7390da7" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP CONSTRAINT "FK_20cb6a24c17c569b109a7390da7"`);
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "client_id"`);
    }
}
