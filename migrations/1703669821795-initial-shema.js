const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialShema1703669821795 {
    name = 'initialShema1703669821795'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "assigned_car_parts" ADD "count" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "assigned_car_parts" DROP COLUMN "count"`);
    }
}
