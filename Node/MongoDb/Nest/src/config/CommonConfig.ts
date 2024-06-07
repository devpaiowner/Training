import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`${process.env.ENV_PATH}`],
});

export const CommonConfig = {
    PORT: process.env.PORT,


    // DB CONFIG
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/msocial',

    API_URL: process.env.API_URL || 'api/',
    API_ADMIN_URL: process.env.API_ADMIN_URL || 'api/admin/',
    APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000/',
    APP_BASE_URL_PDF: process.env.APP_BASE_URL_PDF || 'http://horsely-api-dev.dev9server.com/',

    BCRYPTSALT:10,

    CRYPTO_SECRET_KEY:'$#%^TYGHGY^%%^RTYG&^YHHY&*HYGT%^DREDESW#@$W#%DFTV^AS#%$$%'
};