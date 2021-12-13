import {MigrationInterface, QueryRunner} from "typeorm";

export class createServicesAndTransactionsTable1639356629267 implements MigrationInterface {
    name = 'createServicesAndTransactionsTable1639356629267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` varchar(36) NOT NULL, \`carId\` varchar(255) NOT NULL, \`car\` varchar(255) NULL, \`owner\` varchar(255) NULL, \`total\` decimal NOT NULL, \`discount\` decimal NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
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
    }

}
