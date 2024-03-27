import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {ProjectModel} from "../project.model";

@Injectable()
export class SectionRegisterService {
    private connection: PoolConnection;

    constructor(
        private readonly databaseUtil: DatabaseUtil,
        private readonly projectModel: ProjectModel,
    ) {}

    async registerSection(memberId: string, projectPkey: number, sectionName: string) {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            // project 조회
            const projectSet = await this.projectModel.getProject(
                this.connection,
                memberId,
                projectPkey
            );

            if (projectSet.length === 1) {
                // section 저장
                await this.projectModel.registerSection(
                    this.connection,
                    projectPkey,
                    sectionName
                );

                return { resCode: '0000' };
            } else {
                // project 를 찾을 수 없습니다.
                return { resCode: '0004' };
            }

        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
