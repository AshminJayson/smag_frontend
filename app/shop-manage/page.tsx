"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/context";
import { API } from "@/components/fetching";
import { Tabs, Tab } from "@nextui-org/react";
import { TabDisplay } from "./shopdetails";

export default function Page() {
    const [shops, setShops] = useState([
        {
            shop_id: "1a2740b3-2d2c-4426-b61c-0f3ab489f771",
            shop_name: "tito_store",
            state: "kerala",
            district: "ernakulam",
            user_id: "8000b9bc-28ad-42f0-a16b-6fac40e7635b",
        },
        {
            shop_id: "5552df36-64df-4f8c-a3ea-ed2be69157d0",
            shop_name: "minnu lingeries",
            state: "kerala",
            district: "malappuram",
            user_id: "8000b9bc-28ad-42f0-a16b-6fac40e7635b",
        },
        {
            shop_id: "9727158a-3224-4637-b864-31b7a503ada0",
            shop_name: "Anna ki kada",
            state: "kerala",
            district: "ernakulam",
            user_id: "8000b9bc-28ad-42f0-a16b-6fac40e7635b",
        },
    ]);

    const auth = useAuth();

    const getShops = async () => {
        try {
            const res = await API.get("/shops", {
                params: { user_id: auth?.currUser?.uuid },
            });

            console.log(res.data);
            setShops(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getShops();
    }, []);

    return (
        <div className="flex min-h-screen h-full flex-col items-center p-10 gap-8">
            <h1 className="text-4xl capitalize font-teko">
                Get insights on your stores here.
            </h1>
            <Tabs aria-label="Options" className="w-full justify-center">
                {shops.map((shop) => (
                    <Tab
                        className="font-semibold text-md w-full"
                        key={shop.shop_id}
                        title={shop.shop_name}
                    >
                        <TabDisplay shop_details={shop} />
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}
