import {MigrationInterface, QueryRunner} from "typeorm";

export class createOwnersTable1639303818497 implements MigrationInterface {
    name = 'createOwnersTable1639303818497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`owner\` (\`id\` varchar(36) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`documentNumber\` int NULL, UNIQUE INDEX \`IDX_bb0a6c9bddc213ea418f75c57a\` (\`documentNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_bb0a6c9bddc213ea418f75c57a\` ON \`owner\``);
        await queryRunner.query(`DROP TABLE \`owner\``);
    }

}
