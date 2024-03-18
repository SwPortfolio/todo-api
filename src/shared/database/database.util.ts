import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConnection } from 'mysql2/promise';
import { Configuration} from "../../core/configuration/configuration.interface";

@Injectable()
export class DatabaseUtil implements OnModuleInit {
    public CP: Pool;

    constructor(private readonly configService: ConfigService) {
    }

    async onModuleInit(): Promise<void> {
        const database =
            this.configService.get<Configuration['database']>('database');

        this.CP = mysql.createPool({
            host: database.host,
            user: database.user,
            password: database.password,
            port: database.port,
            database: database.database,
            connectionLimit: database.connectionLimit,
            timezone: '+09:00',
        });

        console.log(`✅ START CONNECTION 🚀 `);
    }

    /**
     * connection 가져오기
     */
    async getDBConnection(): Promise<PoolConnection> {
        return await this.CP.getConnection();
    }

    /**
     * 쿼리 보내기
     * @param connection
     * @param sql
     * @param params
     */
    async dbQuery(
        connection: PoolConnection,
        sql: string,
        params: any[],
    ): Promise<any> {
        try {
            const querySet = await connection.query(sql, params);

            return querySet[0];
        } catch (err) {
            console.log(err);
            err.name = 'DBError';
            throw err;
        }
    }
}
