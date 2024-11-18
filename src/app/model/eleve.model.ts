import { Ecole } from "./ecole.model";
import {Image} from "./Image.model"
export class eleve {
    id! : number;
    nom! : string;
    classe!:string;
    age!: number;
    ecole!:Ecole;
    imageStr!:string;
    images!:Image[];
    }