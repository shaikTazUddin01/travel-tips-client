import { TUser } from "./user";

export interface INotification{
    userId:string;
    _id:string;
    senderId:TUser;
    createdAt:string;
    type:"follow"|"like"|"messages"|'confirm Request';
    isRead:boolean

}