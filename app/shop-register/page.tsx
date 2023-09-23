"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

type Props = { searchParams?: { [key: string]: string | string[] } };

const Page = (props: Props) => {
  console.log(props.searchParams);
  const states = [
    { label: "Andhra Pradesh", value: "AP" },
    { label: "Kerala", value: "KL" },
    { label: "Tamil Nadu", value: "TN" },
    { label: "Karnataka", value: "KA" },
    { label: "Telangana", value: "TS" },
    { label: "Maharashtra", value: "MH" },
  ];
  const districts = [
    {
      key: "AP",
      districts: [
        { label: "Anantapur", value: "Anantapur" },
        { label: "Chittoor", value: "Chittoor" },
      ],
    },
    {
      key: "KL",
      districts: [
        { label: "Alappuzha", value: "Alappuzha" },
        { label: "Ernakulam", value: "Ernakulam" },
      ],
    },
    {
      key: "TN",
      districts: [
        { label: "Ariyalur", value: "Ariyalur" },
        { label: "Chengalpattu", value: "Chengalpattu" },
      ],
    },
    {
      key: "KA",
      districts: [
        { label: "Bagalkot", value: "Bagalkot" },
        { label: "Bangalore Rural", value: "Bangalore Rural" },
      ],
    },
    {
      key: "TS",
      districts: [
        { label: "Adilabad", value: "Adilabad" },
        { label: "Hyderabad", value: "Hyderabad" },
      ],
    },
    {
      key: "MH",
      districts: [
        { label: "Ahmednagar", value: "Ahmednagar" },
        { label: "Akola", value: "Akola" },
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
          <Select variant="bordered" label="State" name="state" id="state">
            {states.map((item, index) => (
              <SelectItem key={`state${index}`} value={item.value}>
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
