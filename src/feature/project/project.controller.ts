import {Body, Controller, Get, Post, Query, Req, Res, UseGuards} from "@nestjs/common";
import {ResponseUtil} from "../../shared/response/response.util";
import {AuthGuard} from "@nestjs/passport";
import {ProjectListService} from "./service/project-list.service";
import {ProjectDetailDto} from "./dto/project-detail.dto";
import {ProjectDetailService} from "./service/project-detail.service";
import {SectionDetailService} from "./service/section-detail.service";
import {SectionDetailDto} from "./dto/section-detail.dto";
import {ProjectRegisterDto} from "./dto/project-register.dto";
import {ProjectRegisterService} from "./service/project-register.service";
import {SectionRegisterService} from "./service/section-register.service";
import {SectionRegisterDto} from "./dto/section-register.dto";

@Controller('project')
export class ProjectController {
    constructor(
        private readonly responseUtil: ResponseUtil,
        private readonly projectListService: ProjectListService,
        private readonly projectDetailService: ProjectDetailService,
        private readonly sectionDetailService: SectionDetailService,
        private readonly projectRegisterService: ProjectRegisterService,
        private readonly sectionRegisterService: SectionRegisterService,
    ) {}

    /**
     * 프로젝트 목록 조회
     * @param req
     * @param res
     */
    @Get('/list')
    @UseGuards(AuthGuard('auth-jwt'))
    async getProjectList(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * project 전체 목록 (삭제된 프로젝트는 제외) 오름차순으로 조회
             * project 별 section 목록 조회
             */
            const { projectList } = await this.projectListService.getProjectList(memberId);

            return this.responseUtil.response(res, 200, '0000', {}, { projectList: projectList });
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 프로젝트 상세조회
     * @param req
     * @param res
     * @param projectDetailDto
     */
    @Get('')
    @UseGuards(AuthGuard('auth-jwt'))
    async getProject(@Req() req: any, @Res() res: any, @Query() projectDetailDto: ProjectDetailDto) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디
            const projectPkey = projectDetailDto.projectPkey; // 프로젝트 일련번호

            /**
             * project 상세조회
             * project 정보 조회
             */

            const { resCode, project } = await this.projectDetailService.getProjectDetail(memberId, projectPkey);

            return this.responseUtil.response(res, 200, resCode, {}, { project: project });
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 프로젝트 구분 상세조회
     * @param req
     * @param res
     * @param sectionDetailDto
     */
    @Get('/section')
    @UseGuards(AuthGuard('auth-jwt'))
    async getSection(@Req() req: any, @Res() res: any, @Query() sectionDetailDto: SectionDetailDto) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디
            const sectionPkey = sectionDetailDto.sectionPkey; // section 일련번호

            /**
             * section 상세조회
             * section 정보 조회
             */

            const { resCode, section } = await this.sectionDetailService.getSection(memberId, sectionPkey);

            return this.responseUtil.response(res, 200, resCode, {}, { section: section });
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 프로젝트 생성
     * @param req
     * @param res
     * @param projectRegisterDto
     */
    @Post('/register')
    @UseGuards(AuthGuard('auth-jwt'))
    async registerProject(@Req() req: any, @Res() res: any, @Body() projectRegisterDto: ProjectRegisterDto) {
        try {
            const memberPkey = req.user.memberPkey; // 회원 일련 아이디

            /**
             * project 생성
             * - projectName
             * - projectColor
             * - sort
             */
            await this.projectRegisterService.registerProject(memberPkey, projectRegisterDto);

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 프로젝트 수정
     * @param req
     * @param res
     */
    @Post('/modify')
    @UseGuards(AuthGuard('auth-jwt'))
    async modifyProject(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * project 수정
             * - projectName
             * - projectColor
             * - sort
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 프로젝트 구분 생성
     * @param req
     * @param res
     * @param sectionRegisterDto
     */
    @Post('/section/register')
    @UseGuards(AuthGuard('auth-jwt'))
    async registerSection(@Req() req: any, @Res() res: any, @Body() sectionRegisterDto: SectionRegisterDto) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * section 생성
             *
             */

            const { resCode } = await this.sectionRegisterService.registerSection(
                memberId,
                sectionRegisterDto.projectPkey,
                sectionRegisterDto.sectionName
            );

            return this.responseUtil.response(res, 200, resCode, {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 프로젝트 구분 수정
     * @param req
     * @param res
     */
    @Post('/section/modify')
    @UseGuards(AuthGuard('auth-jwt'))
    async modifySection(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * section 수정
             * - sectionName
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }
}
