import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config';

import config from '../config';

@Global()
@Module({
    imports: [ TypeOrmModule.forRootAsync({
        inject: [config.KEY],
        useFactory: (configService: ConfigType<typeof config>) => {
            const { username, host, name, password, port } = configService.database
            return {
                type: 'mysql',
                host: host,
                port: port,
                username,
                password,
                database: name,
                autoLoadEntities: true,
                synchronize: true
            }
        }
    })],
    exports: [ TypeOrmModule ]
})
export class DatabaseModule {}