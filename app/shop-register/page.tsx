"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState, useRef } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { IoSparkles as Sparkle } from "react-icons/io5";

type Props = { searchParams?: { [key: string]: string | string[] } };

const Page = (props: Props) => {
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [insight, setInsight] = useState<string | null>(null);
    const formRef = useRef(null);
    const states = [
        { label: "Andhra Pradesh", value: "AP" },
        { label: "Kerala", value: "KL" },
        { label: "Tamil Nadu", value: "TN" },
        { label: "Karnataka", value: "KA" },
        { label: "Telangana", value: "TS" },
        { label: "Maharashtra", value: "MH" },
    ];
    const districts = [
        { label: "Malappuram", value: "MLP" },
        { label: "Kozhikode", value: "KZD" },
        { label: "Wayanad", value: "WYD" },
        { label: "Kannur", value: "KNR" },
        { label: "Kasaragod", value: "KSD" },
        { label: "Thrissur", value: "TSR" },
    ];

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-font center p-24 gap-4">
            <p className="py-6 text-center">
                <h1 className="font-bold text-lg">Register your business</h1>
                <h2 className="font-normal text-md">
                    Enter your details below
                </h2>
            </p>
            <form>
                <Card className="flex flex-col gap-4 w-96 p-4">
                    <Input
                        type="text"
                        placeholder="Enter the name of your business"
                        label="Business Name"
                        name="shop_name"
                        id="shop_name"
                        isRequired
                    />
                    <Select
                        variant="bordered"
                        label="State"
                        name="state"
                        id="state"
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        {states.map((item, index) => (
                            <SelectItem key={item.label} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        variant="bordered"
                        label="District"
                        name="district"
                        id="district"
                        disabled={selectedState == ""}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                        {districts.map((item, index) => (
                            <SelectItem key={item.label} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </Card>
            </form>
            <Card
                className="p-5 flex flex-col justify-center items-center"
                style={{
                    ...(insight && { width: "min(750px,100%)" }),
                }}
            >
                <Button
                    color="primary"
                    className="p-3 w-fit h-fit flex  gap-2 items-center font-bold text-xl "
                >
                    Insight <Sparkle size={25} />
                </Button>
                <p></p>
            </Card>
        </div>
    );
};

export default Page;
