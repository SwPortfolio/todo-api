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
                select projectPkey, projectName, projectColor, sort, project.regDate
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
                select projectPkey, projectName, projectColor, sort, project.regDate
                from project
                join member on project.memberPkey=member.memberPkey
                where member.memberId=? and project.projectPkey=? 
            `,
            [memberId, projectPkey]
        );
    }

    /**
     * section 상세조회
     * @param connection
     * @param memberId
     * @param sectionPkey
     */
    async getSection(connection: PoolConnection, memberId: string, sectionPkey: number) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                select sectionPkey, sectionName
                from section
                join project on section.projectPkey=project.projectPkey
                join member on project.memberPkey=member.memberPkey
                where member.memberId=? and sectionPkey=?
            `,
            [memberId, sectionPkey]
        );
    }

    /**
     * project 생성
     * @param connection
     * @param memberPkey
     * @param projectName
     * @param projectColor
     * @param sort
     */
    async registerProject(connection: PoolConnection, memberPkey: number, projectName: string, projectColor: string, sort: number) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                insert into project (
                    memberPkey, projectName, projectColor, sort, regDate, deleteYn
                ) values (
                    ?, ?, ?, ?, now(), 'N'
                )   
            `,
            [memberPkey, projectName, projectColor, sort]
        );
    }

    async registerSection(connection: PoolConnection, projectPkey: number, sectionName: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                insert into section(
                    projectPkey, sectionName
                ) values (
                    ?, ?
                )
            `,
            [projectPkey, sectionName]
        )
    }
}
