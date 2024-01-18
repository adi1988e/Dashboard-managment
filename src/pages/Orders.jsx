import Heading from "../ui/Heading";
import Row from "../ui/Row";
import OrderTable from "../features/orders/OrderTable";
import { useOrders } from "../features/orders/useOrders";
import Spinner from "../ui/Spinner";

function Orders() {
  const { isLoading, error, orders } = useOrders();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All orders</Heading>
      </Row>

      {isLoading && <Spinner color="red.500" size="xl" />}

      {error && <h1>{error.message}</h1>}

      {orders && <OrderTable />}
    </>
  );
}

export default Orders;
