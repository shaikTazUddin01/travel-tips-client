/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import {
  useAlluserQuery,
  useDeleteUserMutation,
} from "@/src/redux/features/user/userApi";
import { TResponse, TUser } from "@/src/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Image,
} from "@nextui-org/react";
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "sonner";

export default function AllUser() {
  const { data: allUser } = useAlluserQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();


  const handleDeleteUser =async(id: string)=>{
    const toastId=toast.loading("deleting....")
    try {
      
        const res = (await deleteUser(id)) as TResponse<any>;
        if (res?.data) {
          toast.warning("Delete Success",{id:toastId,duration:1000});
        } else {
          toast.error(res?.error?.data?.message,{id:toastId});
        }
      }
     catch (error: any) {
      toast.error(error?.message,{id:toastId});
    }
  }

  return (
    <Table aria-label="static collection table">
      <TableHeader>
        <TableColumn>IMAGE</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        {/* <TableColumn>Verify</TableColumn> */}
        <TableColumn>STATUS</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {allUser?.data?.map((user: TUser) => {
          return (
            <TableRow key={user?._id}>
              <TableCell>
                <Image src={user?.image} className="size-10" />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.role}</TableCell>
              {/* <TableCell>{user?.isVerify}</TableCell> */}
              <TableCell
                className={`${user?.status == "Active" ? "text-green-500" : "text-red-500"}`}
              >
                {user?.status}
              </TableCell>
              <TableCell className="flex gap-2">
                <span className="text-xl hover:bg-slate-200 cursor-pointer p-2 rounded-md">
                  <RiEdit2Fill />
                </span>
                <span className="text-xl text-red-500 hover:bg-slate-200 cursor-pointer p-2 rounded-md" onClick={()=>handleDeleteUser(user?._id)}>
                  <AiFillDelete />
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
