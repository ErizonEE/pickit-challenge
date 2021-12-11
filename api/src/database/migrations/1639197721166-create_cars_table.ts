import {MigrationInterface, QueryRunner} from "typeorm";

export class createCarsTable1639197721166 implements MigrationInterface {
    name = 'createCarsTable1639197721166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`car\` (\`id\` varchar(36) NOT NULL, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`patent\` varchar(10) NOT NULL, \`color\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9c67ac307ce161263ee02dc3f6\` (\`patent\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9c67ac307ce161263ee02dc3f6\` ON \`car\``);
        await queryRunner.query(`DROP TABLE \`car\``);
    }

}
