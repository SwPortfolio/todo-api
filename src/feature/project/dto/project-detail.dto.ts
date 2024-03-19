import {IsNotEmpty, IsNumber} from "class-validator";

export class ProjectDetailDto {
    @IsNotEmpty()
    @IsNumber()
    projectPkey: number;
}
