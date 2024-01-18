import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { useDeleteUser } from "./useDeleteUser";
import Menus from "../../ui/Menus";
import CreateUserForm from "./CreateUserForm";

function UserRow({ user }) {
  const { isDeleting, deleteUser } = useDeleteUser();
  const { _id: userId, name, email, phone, address } = user;

  return (
    <Table.Row>
      <Avatar src="default-user.jpg" alt="user-image" />
      <User>{name}</User>
      <div> {email}</div>
      <Phone>{phone}</Phone>
      <div> {address}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={userId} />

            <Menus.List id={userId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateUserForm userToEdit={user} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="users"
                disabled={isDeleting}
                onConfirm={() => deleteUser(userId)}
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

export default UserRow;
