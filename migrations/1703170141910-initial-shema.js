const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1703170141910 {
    name = 'initialShema1703170141910'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "assigned_car_parts" ("assigned_carpart_id" SERIAL NOT NULL, "report_id" integer NOT NULL, "car_part_id" integer NOT NULL, "price" integer, CONSTRAINT "PK_7d9fcdfae706f7bc6f845f2842f" PRIMARY KEY ("assigned_carpart_id"))`);
        await queryRunner.query(`ALTER TABLE "assigned_car_parts" ADD CONSTRAINT "FK_7120116d9f8d3cf733dd4610e46" FOREIGN KEY ("car_part_id") REFERENCES "car_parts"("car_part_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_car_parts" ADD CONSTRAINT "FK_baa1aa627d21e6ce2fbd5a4cec8" FOREIGN KEY ("report_id") REFERENCES "worker_report"("report_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "assigned_car_parts" DROP CONSTRAINT "FK_baa1aa627d21e6ce2fbd5a4cec8"`);
        await queryRunner.query(`ALTER TABLE "assigned_car_parts" DROP CONSTRAINT "FK_7120116d9f8d3cf733dd4610e46"`);
        await queryRunner.query(`DROP TABLE "assigned_car_parts"`);
    }
}
