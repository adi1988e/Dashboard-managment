import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentOrders } from "./useRecentOrders";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useProducts } from "../products/useProducts";
import SalesChart from "./SalesChart";
import TodayActivity from "../Today Activity/TodayActivity";
import { useCustomers } from "../customers/useCustomers";

function DashboardLayout() {
  const { orders, isLoading: isLoading1 } = useRecentOrders();
  const { numDays } = useRecentStays();
  const { products, isLoading: isLoading3 } = useProducts();
  const { customers } = useCustomers();

  if (isLoading1 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        customers={customers}
        orders={orders}
        numDays={numDays}
        productCount={products.length}
      />
      <TodayActivity />
      <SalesChart orders={orders} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default DashboardLayout;
