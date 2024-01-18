import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { useDeleteCategory } from "./useDeleteCategory.js";
import Menus from "../../ui/Menus";
import CreateCategoryForm from "./CreateCategoryForm";

function CategoryRow({ category }) {
  const { isDeleting, deleteCategory } = useDeleteCategory();

  return (
    <Table.Row>
      <Category>{category.category_name}</Category>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={category._id} />

            <Menus.List id={category._id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCategoryForm categoryToEdit={category} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="categories"
                disabled={isDeleting}
                onConfirm={() => deleteCategory(category._id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

const Category = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

export default CategoryRow;
