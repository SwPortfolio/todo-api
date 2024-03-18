import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {MemberModel} from "../member.model";

@Injectable()
export class MemberInfoService {
    private connection: PoolConnection;

    constructor(private readonly databaseUtil: DatabaseUtil, private readonly memberModel: MemberModel) {}

    async getInfo(memberId: string) {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            // 회원 조회
            const memberSet = await this.memberModel.getMemberInfo(this.connection, memberId);
            const member = memberSet[0];

            return { member: member };
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
