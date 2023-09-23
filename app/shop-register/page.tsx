"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

type Props = { searchParams?: { [key: string]: string | string[] } };

const Page = (props: Props) => {
    console.log(props.searchParams);
    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-font center p-24">
            <h1 className="font-bold text-lg">Register your shop</h1>
            <h2 className="font-normal text-md">Enter your details below</h2>
            <form>
                <Card></Card>
                <Card className="flex justify-center items-center min">
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
