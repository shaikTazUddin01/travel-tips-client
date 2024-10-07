import { ReactNode } from "react";

export interface TPost {
    _id: string;
    user: TUser;
    image: string;
    category: string;
    postContent: string;
    type: string;
    like: [string];
    comment: number;
    share: number;
    createdAt: string;
    updatedAt: string;
    status:string;
    __v: number;
  }
  
  export interface TUser {
    _id: string;
    name: string;
    email: string;
    address: string;
    image: string;
    gender: string;
    role: string;
    isVerify?:boolean;
    status?:"Active"|"Blocked";
    phoneNumber: string;
    __v: number;
  }

  // create post type
  export interface IPostProps {
    buttonText: string;
    variant?:
      | "light"
      | "flat"
      | "solid"
      | "bordered"
      | "faded"
      | "shadow"
      | "ghost"
      | undefined;
    icon?: ReactNode;
    iconColor?: string;
    btnClass?: string;
    size?: "sm" | "md" | "lg" | undefined;
    btnColor?:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger"
      | undefined;
  }
  