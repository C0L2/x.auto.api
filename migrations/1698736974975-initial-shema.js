const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1698736974975 {
    name = 'initialShema1698736974975'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "assigned_services" ("assigned_service_id" SERIAL NOT NULL, "report_id" character varying NOT NULL, "service_id" integer NOT NULL, CONSTRAINT "PK_0601500dab09ac34b244ffc8aae" PRIMARY KEY ("assigned_service_id"))`);
        await queryRunner.query(`ALTER TABLE "assigned_services" ADD CONSTRAINT "FK_1b97b0a16e86ae6b88d3e86019d" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "assigned_services" DROP CONSTRAINT "FK_1b97b0a16e86ae6b88d3e86019d"`);
        await queryRunner.query(`DROP TABLE "assigned_services"`);
    }
}
