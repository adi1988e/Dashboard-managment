import Button from "../../ui/Button";
import CustomerSignupForm from "./CustomerSignupForm";
import Modal from "../../ui/Modal";

function AddCustomer() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button>Add new customer</Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CustomerSignupForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCustomer;
