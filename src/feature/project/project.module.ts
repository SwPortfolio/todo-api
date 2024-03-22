import {Module} from "@nestjs/common";
import {ProjectController} from "./project.controller";
import {ProjectListService} from "./service/project-list.service";
import {ProjectModel} from "./project.model";
import {ProjectDetailService} from "./service/project-detail.service";
import {SectionDetailService} from "./service/section-detail.service";
import {ProjectRegisterService} from "./service/project-register.service";
import {SectionRegisterService} from "./service/section-register.service";

@Module({
    imports: [],
    controllers: [ProjectController],
    providers: [
        ProjectListService,
        ProjectDetailService,
        SectionDetailService,
        ProjectRegisterService,
        SectionRegisterService,
        ProjectModel
    ],
    exports: [],
})

export class ProjectModule {}
