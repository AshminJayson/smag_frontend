"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState, useRef } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { API, routes } from "@/components/fetching";
import { Spinner } from "@nextui-org/spinner";
import { states, MenuOption } from "@/lib/store";
import { districtSorter } from "@/lib/functions/districtSorter";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/modal";

type Props = { searchParams?: { [key: string]: string | string[] } };

const Page = (props: Props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedState, setSelectedState] = useState("");
    const [districts, setDistricts] = useState<MenuOption[]>([]); // [label, value
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [insight, setInsight] = useState<string | null>(null);
    const selectRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const response = districtSorter(selectedState);
        setDistricts(response);
    }, [selectedState]);

    const genInsight = async () => {
        if (insight != null) {
            return onOpen();
        }
        setInsight("loading");

        const select = selectRef.current as any;
        const res = (
            await API.get(routes.insightTop, {
                params: { location: select.value.tolowerCase() },
            })
        ).data;
        onOpen();
        setInsight(res.strategy);
    };
    function parseContent(content: string) {
        const lines = content.split("\n");
        return (
            <ol>
                {lines.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ol>
        );
    }

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-font center p-24 gap-4">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Here are some insights for your business in{" "}
                                {selectedDistrict}!
                            </ModalHeader>
                            <ModalBody className="p-4">
                                {insight && parseContent(insight)}
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="py-6 text-center">
                <p className="font-bold text-lg">Register your business</p>
                <p className="font-normal text-md">Enter your details below</p>
            </div>
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
                        ref={selectRef}
                        variant="bordered"
                        label="District"
                        name="district"
                        id="district"
                        disabled={selectedState == ""}
                        onChange={(e) => {
                            setSelectedDistrict(e.target.value);
                        }}
                    >
                        {districts.map((item, index) => (
                            <SelectItem key={item.label} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <div className="flex gap-2">
                        <Button
                            size="lg"
                            variant="bordered"
                            color="primary"
                            className="flex-1"
                            onPress={genInsight}
                        >
                            {insight === "loading" ? (
                                <Spinner size="sm" />
                            ) : insight ? (
                                "Show Insights"
                            ) : (
                                "Generate Insights"
                            )}
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            color="primary"
                            className="flex justify-center items-center flex-1"
                        >
                            Submit
                        </Button>
                    </div>
                </Card>
            </form>
            {/* <Card
        className="p-5 flex flex-col justify-center items-center"
        style={{
          ...(insight && { width: "min(750px,100%)" }),
        }}
      >
        {(() => {
          if (insight === null)
            return (
              <Button
                color="primary"
                className="p-3 w-fit h-fit flex  gap-2 items-center font-bold text-xl "
                onClick={genInsight}
              >
                Insight <Sparkle size={25} />
              </Button>
            );
          else if (insight === "loading") {
            return <Spinner />;
          } else {
            return <p className="p-4">{insight}</p>;
          }
        })()}
      </Card> */}
        </div>
    );
};

export default Page;
