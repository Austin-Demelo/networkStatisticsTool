import { IProblem} from "../../interfaces/problem";

export interface IProblemState {
    problems: IProblem[];
    hasError: boolean;
    message: string;
}