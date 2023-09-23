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
import { useAuth } from "../contexts/context";
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
            btnText: "Start a new Shop",
            redirect: "/shop-register?new=true",
            heading: "Get into business?",
        },
        {
            imgSrc: "/images/selecttrack/initiate.svg",
            btnText: "Manage your Shops",
            redirect: "/shop-register",
            heading: "Improve Sales",
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
        <div className="flex min-h-screen h-full flex-col items-center justify-font center p-10 gap-16">
            <h1 className="text-4xl p-4 font-teko">
                So what should we help you with today?
            </h1>
            <div className="flex justify-around w-full">
                {pair.map((item, index) => (
                    <Card
                        key={`opt${index}`}
                        onPress={() => nav.push(item.redirect)}
                        className="hover:scale-105 cursor-pointer"
                    >
                        <CardHeader className="flex flex-col">
                            <p className="text-md font-teko font-light">
                                {item.heading}
                            </p>
                            <h4 className="text-black text-3xl font-teko">
                                {item.btnText}
                            </h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            src={item.imgSrc}
                            onClick={() => nav.push(item.redirect)}
                            className="object-cover"
                            alt="Bring Your Own Data"
                            width={300}
                        />
                    </Card>
                ))}
            </div>
            {tableData && tableData.length > 0 && (
                <>
                    <h1 className="text-lg p-4">Owned Shops</h1>
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
                                        onClick={() =>
                                            handleRowClick(row.shop_id)
                                        }
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
