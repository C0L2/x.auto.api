const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1695296201810 {
    name = 'initialShema1695296201810'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_team" ("id" SERIAL NOT NULL, "id_user" integer NOT NULL, "id_team" integer NOT NULL, CONSTRAINT "PK_155dbc144ff2bd4713fdf1f6c77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id_user" SERIAL NOT NULL, "nickname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_9664961c0264d34a3cf82b11700" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id_team" SERIAL NOT NULL, "team_name" character varying NOT NULL, "team_points" integer NOT NULL, "id_user" integer NOT NULL, CONSTRAINT "REL_8665ade2af5ca6952232773178" UNIQUE ("id_user"), CONSTRAINT "PK_e1e2a7daa507086b9f210816230" PRIMARY KEY ("id_team"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_8665ade2af5ca69522327731787" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_8665ade2af5ca69522327731787"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_team"`);
    }
}
