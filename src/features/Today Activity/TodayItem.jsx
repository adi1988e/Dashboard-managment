import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

function TodayItem({ activity }) {
  const { customer_details, status, _id } = activity;

  return (
    <StyledTodayItem>
      {status === 1 && <Tag type="yellow">New</Tag>}
      {status === 2 && <Tag type="blue">Process</Tag>}
      {status === 3 && <Tag type="green">Done</Tag>}
      {status === 4 && <Tag type="red">Canceled</Tag>}

      <Guest>{customer_details.customer_name}</Guest>

      {status === 1 && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/orders/${_id}`}
        >
          Order details
        </Button>
      )}
      {status === 2 && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/orders/${_id}`}
        >
          Order details
        </Button>
      )}
      {status === 3 && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/orders/${_id}`}
        >
          Order details
        </Button>
      )}
      {status === 4 && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/orders/${_id}`}
        >
          Order details
        </Button>
      )}
    </StyledTodayItem>
  );
}
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 5rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default TodayItem;
