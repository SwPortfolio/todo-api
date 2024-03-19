import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {ProjectModel} from "../project.model";

@Injectable()
export class ProjectDetailService {
    private connection: PoolConnection;
    constructor(private readonly databaseUtil: DatabaseUtil, private readonly projectModel: ProjectModel) {}

    async getProjectDetail(memberId: string, projectPkey: number): Promise<{ resCode: string, project: any }> {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            // 프로젝트 상세조회
            const projectSet = await this.projectModel.getProject(this.connection, memberId, projectPkey);
            if (projectSet.length !== 1) {
                // 프로젝트를 찾을 수 없음
                return { resCode: '0004', project: {} };

            } else {
                const project = projectSet[0];

                // 프로젝트 section 목록 조회
                project.sectionList = await this.projectModel.getSectionList(this.connection, projectPkey);

                return { resCode: '0000', project: project };
            }
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
