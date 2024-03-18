import {Injectable} from "@nestjs/common";
import {DatabaseUtil} from "../../shared/database/database.util";
import {PoolConnection} from "mysql2/promise";

@Injectable()
export class AuthModel {
    constructor(private readonly databaseUtil: DatabaseUtil) {}

    async getMemberToken(connection: PoolConnection, token: string, memberId: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
               select * 
               from memberToken
               join member on memberToken.memberPkey=member.memberPkey 
               where accessToken=? and member.memberId=?
            `,
            [token, memberId]
        )
    }
}
