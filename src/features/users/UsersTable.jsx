import Spinner from "../../ui/Spinner";
import UserRow from "./UserRow";
import { useUsers } from "./useUsers.js";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function UsersTable() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div></div>
        </Table.Header>
        {users.map((user) => (
          <UserRow user={user} key={user._id} />
        ))}
      </Table>
    </Menus>
  );
}

export default UsersTable;
