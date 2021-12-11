import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        database: {
            host: process.env.DATABASE_HOST             || "database",
            name: process.env.DATABASE_NAME             || "pickit",
            username: process.env.DATABASE_USER         || "root",
            password: process.env.DATABASE_PASSWORD     || "secret",
            port: parseInt(process.env.DATABASE_PORT)   || 3306
        }
    }
});