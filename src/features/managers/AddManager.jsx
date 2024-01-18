import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateNewManager from "./CreateManagerForm";

function AddManager() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="manager-form">
          <Button>Add new manager</Button>
        </Modal.Open>
        <Modal.Window name="manager-form">
          <CreateNewManager />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddManager;
