import {Module} from "@nestjs/common";
import {DatabaseUtil} from "./database.util";

@Module({
    providers: [DatabaseUtil],
    exports: [DatabaseUtil],
})
export class DatabaseModule {}
