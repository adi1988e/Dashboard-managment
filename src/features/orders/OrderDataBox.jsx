import styled from "styled-components";
import { format } from "date-fns";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import DataItem from "../../ui/DataItem";
import { formatCurrency } from "../../utils/helpers";
import { useChangeStatus } from "./useChangeStatus";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ProductRow from "../orders/ProductRow";

function OrderDataBox({ order }) {
  const {
    customer_details: { customer_name, customer_email, customer_phone },
    created_at,
    total_price,
    products,
  } = order;
  const [dataOrder, setDataOrder] = useState({ ...order });
  const { editStatus } = useChangeStatus();
  return (
    <StyledOrderDataBox>
      <Section>
        <Customer>
          <p>{customer_name}</p>
          <span>&bull;</span>
          <p>{customer_email}</p>
          <span>&bull;</span>
          <p>{customer_phone}</p>
          <span>&bull;</span>
          <Select
            value={dataOrder.status}
            onChange={(e) => {
              editStatus({ id: dataOrder._id, value: e.target.value });
              setDataOrder((prev_order) => {
                return { ...prev_order, status: parseInt(e.target.value) };
              });
            }}
          >
            <option value="1">New</option>
            <option value="2">Processing</option>
            <option value="3">Done</option>
            <option value="4">Canceled</option>
          </Select>
        </Customer>
        <Price>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(total_price)}
          </DataItem>
        </Price>
      </Section>
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Product</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={products}
            render={(product) => (
              <ProductRow
                product={product.product}
                key={product.product._id}
                order={order}
              />
            )}
          />
        </Table>
      </Menus>
      <div>
        <Order>Payment Details :</Order>
        <Order>Total : {total_price.toFixed(2)}$</Order>
        <p>terminal number - {dataOrder.payment_details.terminal_number}</p>
        <p>
          transaction_number - {dataOrder.payment_details.transaction_number}
        </p>
        <p>transaction_date - {dataOrder.payment_details.transaction_date}</p>
        <p>
          last_digits - XXXX-XXXX-XXXX-{dataOrder.payment_details.last_digits}
        </p>
      </div>
      <Footer>
        <p>Ordered {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledOrderDataBox>
  );
}

const StyledOrderDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Order = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

export default OrderDataBox;
