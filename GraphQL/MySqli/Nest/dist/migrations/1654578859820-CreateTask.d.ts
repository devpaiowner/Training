import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateTask1654578859820 implements MigrationInterface {
    #private;
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
