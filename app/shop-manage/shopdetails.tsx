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
} from "@nextui-org/react";
import { useState, useEffect } from "react";

function TableMaker({
    products,
    title,
    loading,
}: {
    products: any[];
    title: string;
    loading: boolean;
}) {
    return (
        <>
            <h1 className="text-center mb-4">{title}</h1>
            <Table title={title}>
                <TableHeader>
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
                                    <Button onClick={() => {}}>
                                        Improve Sales
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}

export function TabDisplay({ shop_details }: { shop_details: any }) {
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [bottomProducts, setBottomProducts] = useState<any[]>([]);

    const [loadingTopProducts, setLoadingTopProducts] = useState(false);
    const [loadingBottomProducts, setLoadingBottomProducts] = useState(false);

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
        try {
            const res = await API.get(routes.getTopItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setBottomProducts(res.data.bottom_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTopProducts();
        getBottomProducts();
    }, [getBottomProducts, getAssociations, getTopProducts]);

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
                <TableMaker
                    products={topProducts}
                    title={"Top Selling Products"}
                    loading={loadingTopProducts}
                />
                <TableMaker
                    products={bottomProducts}
                    title={"Worst Selling Products"}
                    loading={loadingBottomProducts}
                />

                {/* <TableMaker products={} title={} /> */}
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
}
