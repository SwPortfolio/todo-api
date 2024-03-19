import {Module} from "@nestjs/common";
import {ProjectController} from "./project.controller";
import {ProjectListService} from "./service/project-list.service";
import {ProjectModel} from "./project.model";

@Module({
    imports: [],
    controllers: [ProjectController],
    providers: [ProjectListService, ProjectModel],
    exports: [],
})

export class ProjectModule {}
