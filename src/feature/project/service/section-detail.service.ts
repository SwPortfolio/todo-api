import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {ProjectModel} from "../project.model";

@Injectable()
export class SectionDetailService {
    private connection: PoolConnection;

    constructor(private readonly databaseUtil: DatabaseUtil, private readonly projectModel: ProjectModel) {}

    async getSection(memberId: string, sectionPkey: number): Promise<{ resCode: string, section: any }> {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            const sectionSet = await this.projectModel.getSection(this.connection, memberId, sectionPkey);
            if (sectionSet.length === 1) {
                return { resCode: '0000', section: sectionSet[0] };
            } else {
                return { resCode: '0005', section: {} };
            }
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
