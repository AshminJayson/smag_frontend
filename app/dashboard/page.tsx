import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";

type Props = {};

const Page = (props: Props) => {
    const pair = [
        {
            imgSrc: "/images/selecttrack/import.svg",
            btnText: "Import your database",
        },
        {
            imgSrc: "/images/selecttrack/initiate.svg",
            btnText: "Bring Your Own Data",
        },
    ];

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-center p-24">
            <h1 className="font-bold text-xl p-4">Select Flow</h1>
            <div className="flex gap-4 ">
                {pair.map((item, index) => (
                    <Card key={`opt${index}`} className=" hover:scale-105">
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
            <h1 className="font-light text-lg p-4">Write weird shit here!</h1>
        </div>
    );
};

export default Page;
