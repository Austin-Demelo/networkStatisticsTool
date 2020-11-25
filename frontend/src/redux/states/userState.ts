import { IUser } from "../../interfaces/user";

export interface IUserState {
    users: IUser[];
    currentUser?: IUser; 
    hasError: boolean;
    message: string;
}