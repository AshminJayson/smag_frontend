import { API, routes } from "@/components/fetching";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

import { useState, useEffect } from "react";
import { TableMaker } from "@/components/ShopManagePage/Tables/top_table";
import { AssociationTable } from "@/components/ShopManagePage/Tables/associate_table";

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
          Shop ID : <span className="font-normal">{shop_details.shop_id}</span>
        </h1>
        <h1>
          Shop Name :{" "}
          <span className="font-normal">{shop_details.shop_name}</span>
        </h1>
        <h1>
          Shop District :{" "}
          <span className="font-normal">{shop_details.district}</span>
        </h1>
        <h1>
          Shop State : <span className="font-normal">{shop_details.state}</span>
        </h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-8">
        <AssociationTable
          title="Buyer Pattern Analysis"
          loading={loadingAssociations}
          associations={associations}
        />
        <div className="flex gap-4 justify-evenly">
          <TableMaker
            products={topProducts}
            title={"Top Selling Products"}
            description={"These are the products that are selling the most."}
            loading={loadingTopProducts}
            routeToHit={routes.improveTopProductSales}
          />
          <TableMaker
            products={bottomProducts}
            title={"Worst Selling Products"}
            description={
              "These are the products that need to be pushed with offers."
            }
            loading={loadingBottomProducts}
            routeToHit={routes.improveBottomProductSales}
          />
        </div>

        {/* <TableMaker products={} title={} /> */}
      </CardBody>
    </Card>
  );
}
