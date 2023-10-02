const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696249509034 {
    name = 'initialShema1696249509034'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "role" ("role_id" SERIAL NOT NULL, "role_name" character varying NOT NULL, CONSTRAINT "PK_df46160e6aa79943b83c81e496e" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "worker" ("worker_id" SERIAL NOT NULL, "nume_lucrator" character varying NOT NULL, "prenume_lucrator" character varying NOT NULL, "email" character varying NOT NULL, "numar_telefon" character varying NOT NULL, "salary" integer NOT NULL, "password" character varying NOT NULL, "roleRoleId" integer, CONSTRAINT "PK_ad2a529948e7e73bd6ad7b36a80" PRIMARY KEY ("worker_id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("service_id" SERIAL NOT NULL, "service_name" character varying NOT NULL, "service_price" integer NOT NULL, CONSTRAINT "PK_ef0531b9789b488593690ab8d5d" PRIMARY KEY ("service_id"))`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_74fa58bca1d439b972596c9b131" FOREIGN KEY ("roleRoleId") REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_74fa58bca1d439b972596c9b131"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "worker"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }
}
