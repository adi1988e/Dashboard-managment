import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { useDeleteCustomer } from "./useDeleteCustomer.js";
import Menus from "../../ui/Menus";
import CustomerSignupForm from "./CustomerSignupForm";

function CustomerRow(customer) {
  const { isDeleting, deleteCustomer } = useDeleteCustomer();
  return (
    <Table.Row>
      <Avatar src="default-user.jpg" alt="user-image" />
      <User>{customer.user.name}</User>
      <div> {customer.user.email}</div>
      <Phone>{customer.user.phone}</Phone>
      <div>{customer.user.cart}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={customer.user._id} />

            <Menus.List id={customer.user._id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CustomerSignupForm customerToEdit={customer.user} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="customers"
                disabled={isDeleting}
                onConfirm={() => deleteCustomer(customer.user._id)}
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

export default CustomerRow;
