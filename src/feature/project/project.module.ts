import {Module} from "@nestjs/common";
import {ProjectController} from "./project.controller";
import {ProjectListService} from "./service/project-list.service";
import {ProjectModel} from "./project.model";
import {ProjectDetailService} from "./service/project-detail.service";

@Module({
    imports: [],
    controllers: [ProjectController],
    providers: [ProjectListService, ProjectDetailService, ProjectModel],
    exports: [],
})

export class ProjectModule {}
