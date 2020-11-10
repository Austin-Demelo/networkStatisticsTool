export interface IUser {
    Id?: number;
    UserName: string;
    RoleId: number;
    Password: string;
    DevicesIds: Array<number>; //Device
}