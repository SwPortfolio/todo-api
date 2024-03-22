import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {ProjectModel} from "../project.model";
import {ProjectRegisterDto} from "../dto/project-register.dto";

@Injectable()
export class ProjectRegisterService {
    private connection: PoolConnection;

    constructor(private readonly databaseUtil: DatabaseUtil, private readonly projectModel: ProjectModel) {}

    async registerProject(memberPkey: number, projectRegisterDto: ProjectRegisterDto) {
        try {
            this.connection = await this.databaseUtil.getDBConnection()
            await this.connection.beginTransaction();

            // 프로젝트 저장
            await this.projectModel.registerProject(
                this.connection,
                memberPkey,
                projectRegisterDto.projectName,
                projectRegisterDto.projectColor,
                projectRegisterDto.sort,
            )

            await this.connection.commit();
        } catch (err) {
            await this.connection.rollback();
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
