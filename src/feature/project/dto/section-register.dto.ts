import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SectionRegisterDto {
    @IsNotEmpty()
    @IsNumber()
    projectPkey: number;

    @IsNotEmpty()
    @IsString()
    sectionName: string;
}
