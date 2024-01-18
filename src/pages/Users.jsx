import UsersTable from "../features/users/UsersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddUser from "../features/users/AddUser";

function NewUsers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
      </Row>

      <Row>
        <UsersTable />
        <AddUser />
      </Row>
    </>
  );
}

export default NewUsers;
