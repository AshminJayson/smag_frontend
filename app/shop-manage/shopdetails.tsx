import { API, routes } from "@/components/fetching";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    CardFooter,
    Spinner,
    useDisclosure,
    Skeleton,
    Progress,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";

import { useState, useEffect } from "react";

function TableMaker({
    products,
    title,
    loading,
    routeToHit,
}: {
    products: any[];
    title: string;
    loading: boolean;
    routeToHit: string;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [strategy, setStrategy] = useState("");
    const [product, setProduct] = useState("");

    const getBoost = async (item: string) => {
        setStrategy("");
        setProduct("");
        onOpen();
        try {
            const res = await API.get(routeToHit, {
                params: { product_name: item },
            });

            setStrategy(res.data.strategy);
            setProduct(item);
        } catch (err) {
            console.log(err);
        }
    };
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
                    <TableColumn>PRODUCT</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={loading}
                    loadingContent={<Spinner label="Loading..." />}
                    emptyContent={"No rows to display."}
                >
                    {products &&
                        products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{product}</TableCell>
                                <TableCell>
                                    <Button
                                        className="font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2"
                                        onClick={() => getBoost(product)}
                                    >
                                        Improve Sales
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}

function AssociationTable({
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

export function TabDisplay({ shop_details }: { shop_details: any }) {
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [bottomProducts, setBottomProducts] = useState<any[]>([]);
    const [associations, setAssociations] = useState<any>([]);

    const [loadingTopProducts, setLoadingTopProducts] = useState(false);
    const [loadingBottomProducts, setLoadingBottomProducts] = useState(false);
    const [loadingAssociations, setLoadingAssociations] = useState(false);

    const getTopProducts = async () => {
        setLoadingTopProducts(true);
        try {
            const res = await API.get(routes.getTopItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setTopProducts(res.data.top_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoadingTopProducts(false);
    };
    const getBottomProducts = async () => {
        setLoadingBottomProducts(true);
        try {
            const res = await API.get(routes.getBottomItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setBottomProducts(res.data.bottom_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoadingBottomProducts(false);
    };

    const getAssociations = async () => {
        setLoadingAssociations(true);
        try {
            const res = await API.get(routes.getAssociations, {
                params: { shop_id: shop_details.shop_id },
            });

            setAssociations(res.data.buy_patterns);
            console.log(res.data.buy_patterns);
        } catch (error) {
            console.log(error);
        }
        setLoadingAssociations(false);
    };

    useEffect(() => {
        getTopProducts();
        getBottomProducts();
        getAssociations();
    }, []);

    return (
        <Card className="p-4">
            <CardHeader className="flex flex-col items-start">
                <h1>
                    Shop ID :{" "}
                    <span className="font-normal">{shop_details.shop_id}</span>
                </h1>
                <h1>
                    Shop Name :{" "}
                    <span className="font-normal">
                        {shop_details.shop_name}
                    </span>
                </h1>
                <h1>
                    Shop District :{" "}
                    <span className="font-normal">{shop_details.district}</span>
                </h1>
                <h1>
                    Shop State :{" "}
                    <span className="font-normal">{shop_details.state}</span>
                </h1>
            </CardHeader>
            <CardBody className="flex flex-col gap-8">
                <AssociationTable
                    title="Buyer Pattern Analysis"
                    loading={loadingAssociations}
                    associations={associations}
                />
                <div className="flex gap-4">
                    <TableMaker
                        products={topProducts}
                        title={"Top Selling Products"}
                        loading={loadingTopProducts}
                        routeToHit={routes.improveTopProductSales}
                    />
                    <TableMaker
                        products={bottomProducts}
                        title={"Worst Selling Products"}
                        loading={loadingBottomProducts}
                        routeToHit={routes.improveBottomProductSales}
                    />
                </div>

                {/* <TableMaker products={} title={} /> */}
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
}
