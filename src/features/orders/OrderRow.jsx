import styled from "styled-components";
import { HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteOrder } from "./useDeleteOrder";
import { useChangeStatus } from "./useChangeStatus";

function OrderRow(order) {
  const navigate = useNavigate();
  const { deleteOrder, isDeleting } = useDeleteOrder();
  const { editStatus } = useChangeStatus();

  return (
    <Table.Row>
      <Order onClick={() => navigate(`/Orders/${order.order._id}`)}>
        {order.order.order_number}
      </Order>
      <div>
        {new Date(order.order.created_at).toLocaleString("en-US", {
          // weekday: "short",
          month: "short",
          year: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          // second: "numeric",
        })}
      </div>

      <Stacked>
        <span>{order.order.customer_details.customer_name}</span>
        <span>{order.order.customer_details.customer_email}</span>
      </Stacked>
      <div>{order.order.customer_details.customer_phone}</div>
      <Amount>{formatCurrency(order.order.total_price)}</Amount>
      <Select
        color="blue"
        value={order.order.status}
        onChange={(e) => {
          editStatus({ id: order.order._id, value: e.target.value });
        }}
      >
        <option value="1">New</option>
        <option value="2">Processing</option>
        <option value="3">Done</option>
        <option value="4">Canceled</option>
      </Select>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={order.order._id} />
          <Menus.List id={order.order._id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/Orders/${order.order._id}`)}
            >
              See details
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete Order</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="Order"
            disabled={isDeleting}
            onConfirm={() => deleteOrder(order.order._id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

const Order = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-brand-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

export default OrderRow;
