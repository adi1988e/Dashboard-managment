import Spinner from "../../ui/Spinner";
import ManagerRow from "./ManagerRow";
import { useManagers } from "./useManagers.js";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function ManagersTable() {
  const { isLoading, managers } = useManagers();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Address</div>
          <div></div>
        </Table.Header>
        {managers.map((manager) => (
          <ManagerRow manager={manager} key={manager._id} />
        ))}
      </Table>
    </Menus>
  );
}

export default ManagersTable;
