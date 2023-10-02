const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696253753362 {
    name = 'initialShema1696253753362'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_74fa58bca1d439b972596c9b131"`);
        await queryRunner.query(`ALTER TABLE "worker" RENAME COLUMN "roleRoleId" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "hello" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ALTER COLUMN "role_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_d178fab6fbdfdfd8e24dee0588b" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_d178fab6fbdfdfd8e24dee0588b"`);
        await queryRunner.query(`ALTER TABLE "worker" ALTER COLUMN "role_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "hello"`);
        await queryRunner.query(`ALTER TABLE "worker" RENAME COLUMN "role_id" TO "roleRoleId"`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_74fa58bca1d439b972596c9b131" FOREIGN KEY ("roleRoleId") REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
