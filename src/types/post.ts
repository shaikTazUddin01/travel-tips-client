export interface TPost {
    _id: string;
    user: TUser;
    image: string;
    category: string;
    postContent: string;
    tags: string;
    like: number;
    comment: number;
    share: number;
    createdAt: string;
    updatedAt: string;
    isVerify:boolean;
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
    phoneNumber: string;
    __v: number;
  }
  