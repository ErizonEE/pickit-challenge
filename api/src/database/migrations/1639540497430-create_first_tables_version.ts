import {MigrationInterface, QueryRunner} from "typeorm";

export class createFirstTablesVersion1639540497430 implements MigrationInterface {
    name = 'createFirstTablesVersion1639540497430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`car\` (\`id\` varchar(36) NOT NULL, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`patent\` varchar(10) NOT NULL, \`color\` varchar(255) NOT NULL, \`ownerId\` varchar(255) NOT NULL, \`ownerName\` varchar(255) NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_9c67ac307ce161263ee02dc3f6\` (\`patent\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`owner\` (\`id\` varchar(36) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`documentNumber\` int NULL, \`totalCars\` int NOT NULL DEFAULT '0', \`totalTransactions\` int NOT NULL DEFAULT '0', \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_bb0a6c9bddc213ea418f75c57a\` (\`documentNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` varchar(36) NOT NULL, \`carId\` varchar(255) NOT NULL, \`car\` varchar(255) NULL, \`ownerId\` varchar(255) NULL, \`ownerName\` varchar(255) NULL, \`total\` decimal NOT NULL DEFAULT '0', \`discount\` decimal NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`cost\` int NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7806a14d42c3244064b4a1706c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction_services_service\` (\`transactionId\` varchar(36) NOT NULL, \`serviceId\` varchar(36) NOT NULL, INDEX \`IDX_1dceb9b1a2d4d54dfc8964f876\` (\`transactionId\`), INDEX \`IDX_5c900d62c8c9c12c2edd8aef9a\` (\`serviceId\`), PRIMARY KEY (\`transactionId\`, \`serviceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction_services_service\` ADD CONSTRAINT \`FK_1dceb9b1a2d4d54dfc8964f8763\` FOREIGN KEY (\`transactionId\`) REFERENCES \`transaction\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`transaction_services_service\` ADD CONSTRAINT \`FK_5c900d62c8c9c12c2edd8aef9a9\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction_services_service\` DROP FOREIGN KEY \`FK_5c900d62c8c9c12c2edd8aef9a9\``);
        await queryRunner.query(`ALTER TABLE \`transaction_services_service\` DROP FOREIGN KEY \`FK_1dceb9b1a2d4d54dfc8964f8763\``);
        await queryRunner.query(`DROP INDEX \`IDX_5c900d62c8c9c12c2edd8aef9a\` ON \`transaction_services_service\``);
        await queryRunner.query(`DROP INDEX \`IDX_1dceb9b1a2d4d54dfc8964f876\` ON \`transaction_services_service\``);
        await queryRunner.query(`DROP TABLE \`transaction_services_service\``);
        await queryRunner.query(`DROP INDEX \`IDX_7806a14d42c3244064b4a1706c\` ON \`service\``);
        await queryRunner.query(`DROP TABLE \`service\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb0a6c9bddc213ea418f75c57a\` ON \`owner\``);
        await queryRunner.query(`DROP TABLE \`owner\``);
        await queryRunner.query(`DROP INDEX \`IDX_9c67ac307ce161263ee02dc3f6\` ON \`car\``);
        await queryRunner.query(`DROP TABLE \`car\``);
    }

}
