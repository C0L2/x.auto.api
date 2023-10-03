const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696351217928 {
    name = 'initialShema1696351217928'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "masini" ("car_id" SERIAL NOT NULL, "client_id" integer NOT NULL, "registration_number" character varying NOT NULL, "vin_code" character varying NOT NULL, "culoare" character varying NOT NULL, "km" integer NOT NULL, CONSTRAINT "PK_0be5138be728c8878f54c84d2d1" PRIMARY KEY ("car_id"))`);
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "car_modle"`);
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "service_name"`);
        await queryRunner.query(`ALTER TABLE "programari" ADD "car_model" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "masini" ADD CONSTRAINT "FK_d82c9ecf2359ac3f4b699d81c03" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" DROP CONSTRAINT "FK_d82c9ecf2359ac3f4b699d81c03"`);
        await queryRunner.query(`ALTER TABLE "programari" DROP COLUMN "car_model"`);
        await queryRunner.query(`ALTER TABLE "programari" ADD "service_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "programari" ADD "car_modle" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "masini"`);
    }
}
