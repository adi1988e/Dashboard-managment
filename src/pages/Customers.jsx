import CustomersTable from "../features/customers/CustomersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCustomer from "../features/customers/AddCustomer";

function Customers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Customers</Heading>
      </Row>

      <Row>
        <CustomersTable />
        <AddCustomer />
      </Row>
    </>
  );
}

export default Customers;
