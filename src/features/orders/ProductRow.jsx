import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Table from "../../ui/Table";

function ProductRow({ product }) {
  const { product_image, product_name, product_price, discount } = product;

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
