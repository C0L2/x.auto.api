const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1698136889058 {
    name = 'initialShema1698136889058'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_SERVICE_ID" ON "services" ("service_id") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_SERVICE_ID"`);
    }
}
