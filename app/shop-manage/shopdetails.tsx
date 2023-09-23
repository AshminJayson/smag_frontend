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
                <TableBody>
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
    const [topProducts, setTopProducts] = useState(["Rice", "Egg", "Milk"]);
    const [bottomProducts, setBottomProducts] = useState([
        "Milk",
        "Cream",
        "Chicken",
    ]);

    const [loading, setLoading] = useState(false);

    const getTopProducts = async () => {
        try {
            const res = await API.get(routes.getTopItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setTopProducts(res.data.top_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getBottomProducts = async () => {
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
    });

    return (
        <Card className="p-4">
            <CardHeader className="flex flex-col items-start">
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
                    loading={loading}
                />
                <TableMaker
                    products={bottomProducts}
                    title={"Worst Selling Products"}
                    loading={loading}
                />

                {/* <TableMaker products={} title={} /> */}
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
}
