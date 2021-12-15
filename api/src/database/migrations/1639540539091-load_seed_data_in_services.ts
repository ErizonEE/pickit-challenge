import {MigrationInterface, QueryRunner} from "typeorm";

export class loadSeedDataInServices1639540539091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO service (id, name, cost) values ('${this.generateUUID()}', 'Cambio de Aceite', 500)`);
        await queryRunner.query(`INSERT INTO service (id, name, cost) values ('${this.generateUUID()}', 'Cambio de Filtro', 500)`);
        await queryRunner.query(`INSERT INTO service (id, name, cost) values ('${this.generateUUID()}', 'Cambio de Correa', 500)`);
        await queryRunner.query(`INSERT INTO service (id, name, cost) values ('${this.generateUUID()}', 'Revisión General', 500)`);
        await queryRunner.query(`INSERT INTO service (id, name, cost) values ('${this.generateUUID()}', 'Otro', 500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM service`);
    }

    generateUUID() { 
        var d = new Date().getTime();
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
