"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

type Props = { searchParams?: { [key: string]: string | string[] } };

const Page = (props: Props) => {
    console.log(props.searchParams);
    const states = [
        { label: "Andhra Pradesh", value: "andhrapradesh" },
        { label: "Kerala", value: "kerala" },
        { label: "Tamil Nadu", value: "tamilnadu" },
        { label: "Karnataka", value: "karantaka" },
        { label: "Telangana", value: "telangana" },
        { label: "Maharashtra", value: "maharashtra" },
    ];
    const districts = [
        {
            key: "andhrapradesh",
            districts: [
                { label: "Anantapur", value: "anantapur" },
                { label: "Chittoor", value: "chittoor" },
            ],
        },
        {
            key: "kerala",
            districts: [
                { label: "Alappuzha", value: "alappuzha" },
                { label: "Ernakulam", value: "ernakulam" },
            ],
        },
        {
            key: "tamilnadu",
            districts: [
                { label: "Ariyalur", value: "ariyalur" },
                { label: "Chengalpattu", value: "chengalpattu" },
            ],
        },
        {
            key: "karantaka",
            districts: [
                { label: "Bagalkot", value: "bagalkot" },
                { label: "Bangalore Rural", value: "bangalore rural" },
            ],
        },
        {
            key: "telangana",
            districts: [
                { label: "Adilabad", value: "adilabad" },
                { label: "Hyderabad", value: "hyderabad" },
            ],
        },
        {
            key: "maharashtra",
            districts: [
                { label: "Ahmednagar", value: "ahmednagar" },
                { label: "Akola", value: "akola" },
            ],
        },
    ];
    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-font center p-24">
            <h1 className="font-bold text-lg">Register your shop</h1>
            <h2 className="font-normal text-md">Enter your details below</h2>
            <form>
                <Card className="flex flex-col w-96">
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
                    >
                        {states.map((item, index) => (
                            <SelectItem
                                key={`state${index}`}
                                value={item.value}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button color="primary" className="p-0">
                        <label className="grow h-full leading-9 cursor-pointer">
                            Upload
                            <input type="file" className="hidden" />
                        </label>
                    </Button>
                </Card>
            </form>
        </div>
    );
};

export default Page;
