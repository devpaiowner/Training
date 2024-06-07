export const CommonConfig = {
    PORT: 8080,


    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_PORT: process.env.DATABASE_PORT || 3306,
    DATABASE_USER: process.env.DATABASE_USER || 'root',
    DATABASE_PWD: process.env.DATABASE_PWD || 'root',
    DATABASE_NAME: process.env.DATABASE_NAME || 'nest_chat',

    API_URL: process.env.API_URL || 'api/',
    API_ADMIN_URL: process.env.API_ADMIN_URL || 'api/admin/',

    ADMIN_ACCESS_TOKEN_SECRET: process.env.ADMIN_ACCESS_TOKEN_SECRET || '435^&*(HFRGHUG&T^%4rIJYT%R$%^&8gb85415125^&ghb^%&YB$%Rv',
    ADMIN_ACCESS_TOKEN_SIGNOPTIONS: { expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRATION || '1d' },

    API_ACCESS_TOKEN_SECRET: process.env.API_ACCESS_TOKEN_SECRET || 'RTYU%$^&*HUNH&^RFT&*UIJNH%D$^&GI%^EMIOJIK$%JI$ED%RFUJ(IK',
    API_ACCESS_TOKEN_EXPIRATION: process.env.API_ACCESS_TOKEN_EXPIRATION || '1d',
    API_ACCESS_TOKEN_SIGNOPTIONS: { expiresIn: process.env.API_ACCESS_TOKEN_EXPIRATION || '1d' },

    BCRYPTSALT: 10,

    SQLZR_POOL_SETTING: {
        POOL_MAX: 50,
        POOL_MIN: 0,
        POOL_IDLE: 10000,
        POOL_ACQUIRE: 60000,
        POOL_EVICT: 1000
    },

    PAGE: 0,
    PAGE_SIZE: 10,
    ORDER_DIRECTION: 'DESC',
    ASC_ORDER_DIRECTION: 'ASC',

}