"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

type Props = { searchParams?: { [key: string]: string | string[] } };

const Page = (props: Props) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
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
    <div className="flex min-h-screen h-full flex-col items-center justify-font center p-24">
      <h1 className="font-bold text-lg">Register your shop</h1>
      <h2 className="font-normal text-md">Enter your details below</h2>
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
    </div>
  );
};

export default Page;
