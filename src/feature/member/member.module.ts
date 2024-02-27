import {Module} from "@nestjs/common";
import {MemberController} from "./member.controller";

@Module({
    imports: [],
    controllers: [MemberController],
    providers: [],
    exports: [],
})
export class MemberModule {}
