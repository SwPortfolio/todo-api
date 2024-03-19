import {Injectable} from "@nestjs/common";
import {DatabaseUtil} from "../../shared/database/database.util";
import {PoolConnection} from "mysql2/promise";

@Injectable()
export class ProjectModel {
    constructor(private readonly databaseUtil: DatabaseUtil) {
    }

    /**
     * 회원별 project 목록 조회
     * @param connection
     * @param memberId
     */
    async getProjectList(connection: PoolConnection, memberId: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                select *
                from project
                join member on project.memberPkey=member.memberPkey
                where member.memberId=? and project.deleteYn='N' 
                order by project.sort
            `,
            [memberId]
        )
    }

    async getSectionList(connection: PoolConnection, projectPkey: number) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                select *
                from section
                where proejctPkey=?
            `,
            []
        );
    }
}
