import { IUser } from "../../interfaces/user";

export interface IUserState {
    users: IUser[];
    currentUserId?: number; 
    hasError: boolean;
    message: string;
}