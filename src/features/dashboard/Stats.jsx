import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineGift,
  HiUsers,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ orders, customers, numDays, productCount }) {
  const numOrders = orders.orders.length;
  const numCustomers = customers.length;
  const sales = orders.orders.reduce((acc, cur) => acc + cur.total_price, 0);
  return (
    <>
      <Stat
        title="Orders"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOrders}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Customers"
        color="indigo"
        icon={<HiUsers />}
        value={numCustomers}
      />
      <Stat
        title="Products"
        color="yellow"
        icon={<HiOutlineGift />}
        value={productCount}
      />
    </>
  );
}

export default Stats;
