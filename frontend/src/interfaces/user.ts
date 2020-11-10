export interface IUser {
    Id?: number;
    UserName: string;
    RoleId: string;
    Password: string;
    DevicesIds: Array<number>; //Device
}