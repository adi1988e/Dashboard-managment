import {
  ButtonGroup,
  // Button,
  Text,
  InputRightElement,
  Input,
  InputGroup,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { SearchIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useOrders } from "./useOrders";
import Menus from "../../ui/Menus";
import OrderRow from "./OrderRow";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
// import ButtonGroup from "../../ui/ButtonGroup";

function OrdersTable() {
  const { orders } = useOrders();
  const [filterStatus, setFilterStatus] = useState(null);
  const [dataOrders, setDataOrders] = useState([...orders]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("ASC");
  const [sortIndex, setSortIndex] = useState(null);
  const { colorMode } = useColorMode();

  const sortColumnInTable = (col, nestedCol) => {
    if (sort === "ASC") {
      const sorted = dataOrders.sort((a, b) => {
        if (nestedCol) {
          return a[nestedCol][col] > b[nestedCol][col] ? 1 : -1;
        } else {
          return a[col] > b[col] ? 1 : -1;
        }
      });
      setDataOrders(sorted);
      setSort("DESC");
    }
    if (sort === "DESC") {
      const sorted = dataOrders.sort((a, b) => {
        if (nestedCol) {
          return a[nestedCol][col] > b[nestedCol][col] ? -1 : 1;
        } else {
          return a[col] > b[col] ? -1 : 1;
        }
      });
      setDataOrders(sorted);
      setSort("ASC");
    }
  };

  useEffect(() => {
    orders.map((order) => (order.order_number = order.order_number.toString()));
    const searchResults = orders.filter(
      (order) =>
        order.customer_details.customer_name.includes(searchTerm) ||
        order.customer_details.customer_phone.includes(searchTerm) ||
        order.order_number.includes(searchTerm)
    );
    setDataOrders(searchResults);
  }, [searchTerm, orders]);

  useEffect(() => {
    setDataOrders([...orders]);
  }, [orders]);

  return (
    <>
      <Text mb={2.5}>total:{orders.length}</Text>
      <HStack justifyContent={"space-between"}>
        <ButtonGroup my={5}>
          <Button
            variant={filterStatus === null ? "solid" : "outline"}
            onClick={() => setFilterStatus(null)}
          >
            All
          </Button>
          <Button
            variant={filterStatus === 1 ? "solid" : "outline"}
            onClick={() => setFilterStatus(1)}
          >
            New
          </Button>
          <Button
            variant={filterStatus === 2 ? "solid" : "outline"}
            onClick={() => setFilterStatus(2)}
          >
            Process
          </Button>
          <Button
            variant={filterStatus === 3 ? "solid" : "outline"}
            onClick={() => setFilterStatus(3)}
          >
            Done
          </Button>
          <Button
            // size="small"
            variant={filterStatus === 4 ? "solid" : "outline"}
            bg={colorMode === "dark" && filterStatus === 4 && "white"}
            onClick={() => setFilterStatus(4)}
            colorScheme={colorMode === "dark" ? "white" : "blackAlpha"}
          >
            Canceled
          </Button>
        </ButtonGroup>
        <InputGroup maxW={480}>
          <Input
            placeholder=" search "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </HStack>

      <Menus>
        <Table columns="1.9fr 2.8fr 2.2fr 1fr 1fr 0.5fr 0.5fr ">
          <Table.Header>
            <div
              onClick={() => {
                sortColumnInTable("order_number");
                setSortIndex(1);
              }}
            >
              <HStack>
                <span>Order Number</span>
                {sortIndex === 1 && sort === "ASC" && <ArrowDownIcon />}
                {sortIndex === 1 && sort === "DESC" && <ArrowUpIcon />}
              </HStack>
            </div>
            <div
              onClick={() => {
                sortColumnInTable("created_at");
                setSortIndex(2);
              }}
            >
              <HStack>
                <span>Date</span>
                {sortIndex === 2 && sort === "ASC" && <ArrowDownIcon />}
                {sortIndex === 2 && sort === "DESC" && <ArrowUpIcon />}
              </HStack>
            </div>
            <div
              onClick={() => {
                sortColumnInTable("customer_name", "customer_details");
                setSortIndex(3);
              }}
            >
              <HStack>
                <span>Customer Name</span>
                {sortIndex === 3 && sort === "ASC" && <ArrowDownIcon />}
                {sortIndex === 3 && sort === "DESC" && <ArrowUpIcon />}
              </HStack>
            </div>
            <div
              onClick={() => {
                sortColumnInTable("customer_phone", "customer_details");
                setSortIndex(4);
              }}
            >
              <HStack>
                <span>Customer Phone</span>
                {sortIndex === 4 && sort === "ASC" && <ArrowDownIcon />}
                {sortIndex === 4 && sort === "DESC" && <ArrowUpIcon />}
              </HStack>
            </div>
            <div
              onClick={() => {
                sortColumnInTable("total_price");
                setSortIndex(5);
              }}
            >
              <HStack>
                <span>Total</span>
                {sortIndex === 5 && sort === "ASC" && <ArrowDownIcon />}
                {sortIndex === 5 && sort === "DESC" && <ArrowUpIcon />}
              </HStack>
            </div>
            <div>STATUS</div>
            <div></div>
          </Table.Header>
          {dataOrders
            .filter((order) => {
              if (filterStatus === null) return order;
              else if (filterStatus === 1) return order.status === 1;
              else if (filterStatus === 2) return order.status === 2;
              else if (filterStatus === 3) return order.status === 3;
              else if (filterStatus === 4) return order.status === 4;
              return order;
            })
            .map((order, index) => (
              <OrderRow order={order} key={order._id} />
            ))}
        </Table>
      </Menus>
    </>
  );
}

export default OrdersTable;
