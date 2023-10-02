const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1696283039718 {
    name = 'initialShema1696283039718'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "client" ("client_id" SERIAL NOT NULL, "nume_client" character varying NOT NULL, "prenume_client" character varying NOT NULL, "email" character varying NOT NULL, "numar_telefon" character varying NOT NULL, "password" character varying NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_7510ce0a84bde51dbff978b4b49" PRIMARY KEY ("client_id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_ea545365f74ddd2a7ed1fd42639" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_ea545365f74ddd2a7ed1fd42639"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }
}
