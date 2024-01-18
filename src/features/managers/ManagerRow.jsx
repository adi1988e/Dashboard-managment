import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { useDeleteManager } from "./useDeleteManager.js";
import Menus from "../../ui/Menus";
import CreateManagerForm from "./CreateManagerForm";

function ManagerRow({ manager }) {
  const { isDeleting, deleteManager } = useDeleteManager();

  const {
    _id: managerId,
    manager_name,
    manager_email,
    manager_phone,
    manager_address,
  } = manager;

  return (
    <Table.Row>
      <Avatar src="default-user.jpg" alt="user-image" />
      <User>{manager_name}</User>
      <div> {manager_email}</div>
      <Phone>{manager_phone}</Phone>
      <div> {manager_address}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={managerId} />

            <Menus.List id={managerId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateManagerForm managerToEdit={manager} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="managers"
                disabled={isDeleting}
                onConfirm={() => deleteManager(managerId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Phone = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

export default ManagerRow;
