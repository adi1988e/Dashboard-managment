import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateNewCategory from "./CreateCategoryForm";

function AddCategory() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="category-form">
          <Button>Add new category</Button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CreateNewCategory />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCategory;
