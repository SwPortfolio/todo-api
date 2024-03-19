import {IsNotEmpty, IsNumber} from "class-validator";

export class SectionDetailDto {
    @IsNotEmpty()
    @IsNumber()
    sectionPkey: number;
}
