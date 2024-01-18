import styled from "styled-components";
import OrderDataBox from "./OrderDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useOrder } from "./useOrder";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteOrder } from "./useDeleteOrder";
import Empty from "../../ui/Empty";

function OrderDetail() {
  const { order, isLoading } = useOrder();
  const { deleteOrder, isDeleting } = useDeleteOrder();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!order) return <Empty resourceName="order" />;

  const { status, _id: orderId } = order;

  const statusToTagName = {
    1: "orange",
    2: "yellow",
    3: "green",
    4: "red",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Order #{order.order_number}</Heading>
          <Tag type={statusToTagName[status]}>{status}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <OrderDataBox order={order} />
      <Modal>
        <Modal.Open opens="delete">
          <Button variation="danger">Delete order</Button>
        </Modal.Open>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="order"
            disabled={isDeleting}
            onConfirm={() =>
              deleteOrder(orderId, {
                onSettled: () => navigate(-1),
              })
            }
          />
        </Modal.Window>
      </Modal>

      <Button variation="secondary" onClick={moveBack}>
        Back
      </Button>
    </>
  );
}

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default OrderDetail;
