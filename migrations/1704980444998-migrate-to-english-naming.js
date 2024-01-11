const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class migrateToEnglishNaming1704980444998 {
    name = 'migrateToEnglishNaming1704980444998'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "Appointments" ("appointment_id" SERIAL NOT NULL, "appointment_name" character varying NOT NULL, "appointment_start_date" TIMESTAMP NOT NULL, "appointment_finish_date" TIMESTAMP NOT NULL, "description" character varying, "client_id" integer, "worker_id" integer NOT NULL, CONSTRAINT "PK_2b0f5468319aa1ffeb91c69dff8" PRIMARY KEY ("appointment_id"))`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_f62fcdcc2faca0ebe9d7936cb0c" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_ebed0d3d9a3cd9fbb194caa1130" FOREIGN KEY ("worker_id") REFERENCES "worker"("worker_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_ebed0d3d9a3cd9fbb194caa1130"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_f62fcdcc2faca0ebe9d7936cb0c"`);
        await queryRunner.query(`DROP TABLE "Appointments"`);
    }
}
