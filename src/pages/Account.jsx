import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import { useUser } from "../features/authentication/useUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  const { user } = useUser();
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm user={user} />
      </Row>
    </>
  );
}

export default Account;
