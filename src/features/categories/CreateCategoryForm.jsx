import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCreateCategory } from "./useCreateCategory";
import { useEditCategory } from "./useEditCategory";

function CreateCategoryForm({ categoryToEdit = {}, onCloseModal }) {
  const { createCategory, isCreating } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();
  const isWorking = isCreating || isEditing;
  const { _id, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(_id);
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      editCategory(
        { newCategoryName: data, id: categoryToEdit._id },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCategory(data, {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Category name" error={errors?.category_name?.message}>
        <Input
          type="text"
          id="category_name"
          disabled={isWorking}
          {...register("category_name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit category" : "Create new category"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCategoryForm;
