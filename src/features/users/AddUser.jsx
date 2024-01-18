import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button>Add new user</Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
