import { Sequelize } from 'sequelize-typescript';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME } from './Config';
export const sequelize = new Sequelize({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    logging: true,
    dialect:"mysql",
    storage:":memory:",
    models:[__dirname + '../../models']
})