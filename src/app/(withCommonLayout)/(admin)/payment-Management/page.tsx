"use client";
import TDForm from "@/src/components/form/TDForm";
import TDSelect from "@/src/components/form/TDSelect";
import { useGetAllVerifyInFoQuery } from "@/src/redux/features/userVerify/verifyApi";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Select,
  SelectItem,
} from "@nextui-org/react";
import moment from "moment";
import { useState } from "react";

const PaymentManagement = () => {
  const { data: verifyedInFo, isLoading } = useGetAllVerifyInFoQuery(undefined);

  const months = moment.months();
  console.log(months);
  const monthOptions = months.map((month) => ({ key: month, label: month }));

  const handleFilter = (data) => {};

  return (
    <>
      <div className=" flex justify-end">
        <div className="w-[200px]">
          <TDForm onSubmit={handleFilter}>
            <TDSelect
              name="month"
              label="filter by month"
              options={monthOptions}
            />
          </TDForm>
        </div>
      </div>

      {/* Table */}
      <Table
        isHeaderSticky
        isStriped
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Email</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Transaction Id</TableColumn>
          <TableColumn>Processor</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {verifyedInFo?.data?.map((item: any) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.user?.email}</TableCell>
              <TableCell>{moment(item?.date).format("lll")}</TableCell>
              <TableCell>{item?.totalPay}</TableCell>
              <TableCell>{item?.transactionId}</TableCell>
              <TableCell>{item?.payment_processor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PaymentManagement;
