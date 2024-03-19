import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {ProjectModel} from "../project.model";

@Injectable()
export class ProjectListService {
    private connection: PoolConnection;

    constructor(private readonly databaseUtil: DatabaseUtil, private readonly projectModel: ProjectModel) {}

    /**
     * project 목록 조회
     * 하위 section 목록 조회
     * @param memberId
     */
    async getProjectList(memberId: string): Promise<{projectList: any[]}> {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            // project 목록 조회
            const projectSet = await this.projectModel.getProjectList(this.connection, memberId);

            // section 목록 조회
            const projectList = projectSet.map(async (project: any) => {
                project.sectionList = await this.projectModel.getSectionList(this.connection, project.projectPkey);
                return project;
            });

            return { projectList: projectList };
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
