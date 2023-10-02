const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696289900250 {
    name = 'initialShema1696289900250'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "programari" ("programare_id" SERIAL NOT NULL, "client_id" integer NOT NULL, "car_modle" character varying NOT NULL, "problem_description" character varying NOT NULL, "service_name" character varying NOT NULL, "registr_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_5c3ae2542973b386ca5ba20c8ff" PRIMARY KEY ("programare_id"))`);
        await queryRunner.query(`ALTER TABLE "programari" ADD CONSTRAINT "FK_20cb6a24c17c569b109a7390da7" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programari" DROP CONSTRAINT "FK_20cb6a24c17c569b109a7390da7"`);
        await queryRunner.query(`DROP TABLE "programari"`);
    }
}
