import ManagersTable from "../features/managers/ManagersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddManager from "../features/managers/AddManager";

function Managers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Managers</Heading>
      </Row>
      <Row>
        <ManagersTable />
        <AddManager />
      </Row>
    </>
  );
}

export default Managers;
