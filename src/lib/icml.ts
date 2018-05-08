import { CmlModel } from "./cml.model";

export interface ICml {
    push(cml: CmlModel): void;
    get(host: string, idPost: string): Promise<CmlModel[]>;
}