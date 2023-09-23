"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";
import React, { useState, useEffect } from "react";
import { API } from "@/components/fetching";
import { useAuth } from "../contexts/Context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Table_T = {
  District: string;
  State: string;
  shop_id: string;
  shop_name: string;
  user_id: string;
};

type Props = {};

const Page = (props: Props) => {
  const { currUser } = useAuth()!;
  const [tableData, setTableData] = useState<Table_T[] | null>(null);
  const nav = useRouter();
  const pair = [
    {
      imgSrc: "/images/selecttrack/import.svg",
      btnText: "Import your database",
      redirect: "/shop-register?new=true",
    },
    {
      imgSrc: "/images/selecttrack/initiate.svg",
      btnText: "Use Our Data",
      redirect: "/shop-register",
    },
  ];

  const getShops = async () => {
    try {
      const res = await API.get("/shops", {
        params: { user_id: currUser?.uuid },
      });
      setTableData(res.data);
    } catch (err) {
      toast.error("Table fetch failed");
    }
  };
  const handleRowClick = async (shop_id: string) => {
    try {
      const res = shop_id;
      console.log(res);
    } catch (err: any) {
      toast.error(err.toString());
    }
  };
  useEffect(() => {
    getShops();
  }, []);
  return (
    <div className="flex min-h-screen h-full flex-col items-center justify-font center p-24">
      <h1 className="font-bold text-xl p-4">Select Flow</h1>
      <div className="flex gap-4 ">
        {pair.map((item, index) => (
          <Card
            key={`opt${index}`}
            className="point hover:scale-105"
            onClick={() => nav.push(item.redirect)}
          >
            <Image
              src={item.imgSrc}
              className="object-cover"
              alt="Bring Your Own Data"
              width={400}
            />
            <CardFooter className="justify-center border-1 py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 backdrop-blur-xl">
              <p className="text-small">{item.btnText}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {tableData && tableData.length > 0 && (
        <>
          <h1 className="font-light text-lg p-4">Owned Shops</h1>
          {tableData ? (
            <Table className="min-w-full">
              <TableHeader>
                <TableColumn>Shop Name</TableColumn>
                <TableColumn>State</TableColumn>
                <TableColumn>District</TableColumn>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(row.shop_id)}
                  >
                    <TableCell>{row.shop_name}</TableCell>
                    <TableCell>{row.State}</TableCell>
                    <TableCell>{row.District}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Spinner />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
