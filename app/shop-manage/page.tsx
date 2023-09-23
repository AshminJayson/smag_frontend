"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "sonner";
import { useAuth } from "../contexts/context";
import { API } from "@/components/fetching";

type Table_T = {
    District: string;
    State: string;
    shop_id: string;
    shop_name: string;
    user_id: string;
};

export default function Page() {
    const [tableData, setTableData] = useState<Table_T[] | null>(null);
    const { currUser } = useAuth()!;
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
        <div>
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
}
