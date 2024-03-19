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
                select projectPkey, projectName, projectColor, sort, regDate
                from project
                join member on project.memberPkey=member.memberPkey
                where member.memberId=? and project.deleteYn='N' 
                order by project.sort
            `,
            [memberId]
        )
    }

    /**
     * project 별 section 목록 조회
     * @param connection
     * @param projectPkey
     */
    async getSectionList(connection: PoolConnection, projectPkey: number) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                select sectionPkey, sectionName
                from section
                where projectPkey=?
            `,
            [projectPkey]
        );
    }

    /**
     * project 상세조회
     * @param connection
     * @param memberId
     * @param projectPkey
     */
    async getProject(connection: PoolConnection, memberId: string, projectPkey: number) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                select projectPkey, projectName, projectColor, sort, regDate
                from project
                join member on project.memberPkey=member.memberPkey
                where member.memberId=? and project.projectPkey=? 
            `,
            [memberId, projectPkey]
        );
    }
}
