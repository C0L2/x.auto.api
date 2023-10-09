const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696854925016 {
    name = 'initialShema1696854925016'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "furnizori" ("provider_id" SERIAL NOT NULL, "provider_name" character varying NOT NULL, "provider_adress" character varying NOT NULL, "provider_email" character varying NOT NULL, "provider_phone" character varying NOT NULL, CONSTRAINT "PK_5444c1feab4018e730dca1d3d57" PRIMARY KEY ("provider_id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "furnizori"`);
    }
}
