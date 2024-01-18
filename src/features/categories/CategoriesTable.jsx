import Spinner from "../../ui/Spinner";
import CategoryRow from "./CategoryRow";
import { useCategories } from "./useCategories.js";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CategoriesTable() {
  const { isLoading, categories } = useCategories();
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns=" 1fr 1fr 1fr   ">
        <Table.Header>
          <div>Name</div>
          <div></div>
          <div></div>
        </Table.Header>
        {categories.map((category) => (
          <CategoryRow category={category} key={category._id} />
        ))}
      </Table>
    </Menus>
  );
}

export default CategoriesTable;
