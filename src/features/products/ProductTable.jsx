import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function ProductTable() {
  const { isLoading, products } = useProducts();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!products.length) return <Empty resourceName="products" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredProducts;
  if (filterValue === "all") filteredProducts = products;
  if (filterValue === "no-discount")
    filteredProducts = products.filter((product) => product.discount === 0);
  if (filterValue === "with-discount")
    filteredProducts = products.filter((product) => product.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedProducts = filteredProducts.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Product</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Stock</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedProducts}
          render={(product) => (
            <ProductRow product={product} key={product._id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ProductTable;
