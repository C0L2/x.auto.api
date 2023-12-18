const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1702905594114 {
    name = 'initialShema1702905594114'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" DROP CONSTRAINT "FK_d82c9ecf2359ac3f4b699d81c03"`);
        await queryRunner.query(`ALTER TABLE "masini" ALTER COLUMN "client_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "masini" ALTER COLUMN "client_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "masini" ADD CONSTRAINT "FK_d82c9ecf2359ac3f4b699d81c03" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "masini" DROP CONSTRAINT "FK_d82c9ecf2359ac3f4b699d81c03"`);
        await queryRunner.query(`ALTER TABLE "masini" ALTER COLUMN "client_id" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "masini" ALTER COLUMN "client_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "masini" ADD CONSTRAINT "FK_d82c9ecf2359ac3f4b699d81c03" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
