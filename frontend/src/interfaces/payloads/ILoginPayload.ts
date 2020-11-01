import { IUser } from "../user";

export interface ILoginPayload {
    error: boolean;
    response: {
        message: string;
    }
    user?: IUser;
}