import Spinner from "../../ui/Spinner";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./useCustomers.js";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CustomersTable() {
  const { isLoading, customers } = useCustomers();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.4fr 1.3fr 1.5fr 0.8fr 1.5fr 0.2fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Cart</div>

          <div></div>
        </Table.Header>
        {customers.map((customer) => (
          <CustomerRow user={customer} key={customer._id} />
        ))}
      </Table>
    </Menus>
  );
}

export default CustomersTable;
