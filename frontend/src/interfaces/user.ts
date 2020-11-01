export interface IUser {
    Id: number;
    UserName: string;
    RoleId: number;
    DevicesIds: Array<number>; //Device
}