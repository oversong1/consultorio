import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExamsAndAppointments1768930963370 implements MigrationInterface {
    name = 'CreateExamsAndAppointments1768930963370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_62069f52ebba471c91de5d59d61\` ON \`doctors\``);
        await queryRunner.query(`DROP INDEX \`UQ_d7e8212b37dd4e61e996d7289cd\` ON \`doctors\``);
        await queryRunner.query(`CREATE TABLE \`exams\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`specialty\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appointments\` (\`id\` varchar(36) NOT NULL, \`appointment_date\` datetime NOT NULL, \`observations\` varchar(255) NULL, \`user_id\` varchar(255) NOT NULL, \`exam_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD UNIQUE INDEX \`IDX_d7e8212b37dd4e61e996d7289c\` (\`crm\`)`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD UNIQUE INDEX \`IDX_62069f52ebba471c91de5d59d6\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_66dee3bea82328659a4db8e54b7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_f386121e2d22adb229dc12869d2\` FOREIGN KEY (\`exam_id\`) REFERENCES \`exams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_f386121e2d22adb229dc12869d2\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_66dee3bea82328659a4db8e54b7\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP INDEX \`IDX_62069f52ebba471c91de5d59d6\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP INDEX \`IDX_d7e8212b37dd4e61e996d7289c\``);
        await queryRunner.query(`DROP TABLE \`appointments\``);
        await queryRunner.query(`DROP TABLE \`exams\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_d7e8212b37dd4e61e996d7289cd\` ON \`doctors\` (\`crm\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_62069f52ebba471c91de5d59d61\` ON \`doctors\` (\`email\`)`);
    }

}
