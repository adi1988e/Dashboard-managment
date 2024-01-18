import styled from "styled-components";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function ProductRow({ product }) {
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const {
    _id: productId,
    product_image,
    product_name,
    product_price,
    discount,
  } = product;

  return (
    <Table.Row>
      <Img src={product_image} />
      <Product>{product_name}</Product>
      <Price>{formatCurrency(product_price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={productId} />

            <Menus.List id={productId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateProductForm productToEdit={product} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="products"
                disabled={isDeleting}
                onConfirm={() => deleteProduct(productId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Product = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default ProductRow;
