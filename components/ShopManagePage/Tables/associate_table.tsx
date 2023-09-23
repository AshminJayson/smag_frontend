import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    Skeleton,
    ModalBody,
    Spinner,
    ModalFooter,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Progress,
} from "@nextui-org/react";
import { useState } from "react";

export function AssociationTable({
    title,
    loading,
    associations,
}: {
    title: string;
    loading: boolean;
    associations: any[];
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [strategy, setStrategy] = useState("");
    const [product, setProduct] = useState("");

    // const getBoost = async (item: string) => {
    //     setStrategy("");
    //     setProduct("");
    //     onOpen();
    //     try {
    //         const res = await API.get(routeToHit, {
    //             params: { product_name: item },
    //         });

    //         setStrategy(res.data.strategy);
    //         setProduct(item);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <div className="flex flex-col w-full">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {product === "" ? (
                                    <Skeleton />
                                ) : (
                                    <p>
                                        Strategy for Improving Sales of{" "}
                                        {product}
                                    </p>
                                )}
                            </ModalHeader>
                            <ModalBody>
                                {product === "" ? (
                                    <Spinner />
                                ) : (
                                    <p>{strategy}</p>
                                )}
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <h1 className="text-center mb-4">{title}</h1>
            <Table title={title} aria-label={title}>
                <TableHeader className="text-lg">
                    <TableColumn>NO</TableColumn>
                    <TableColumn>BASKET ITEMS</TableColumn>
                    <TableColumn>ALSO PURCHASES</TableColumn>
                    <TableColumn>CONFIDENCE</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={<Spinner label="Loading..." />}
                    emptyContent={"No rows to display."}
                >
                    {associations &&
                        associations.map((association, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{association.src_items}</TableCell>
                                <TableCell>{association.rec_items}</TableCell>
                                <TableCell>
                                    <Progress
                                        aria-label="Loading..."
                                        value={association.confidence * 100}
                                        showValueLabel={true}
                                        className="max-w-md"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
