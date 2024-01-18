import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import SelectCategory from "./SelectCategory";
import { useCreateProduct } from "./useCreateProduct";
import { useEditProduct } from "./useEditProduct";

function CreateProductForm({ productToEdit = {}, onCloseModal }) {
  const { isCreating, createProduct } = useCreateProduct();
  const { isEditing, editProduct } = useEditProduct();
  const isWorking = isCreating || isEditing;
  const [chosenCategories, setChosenCategories] = useState([]);
  const { _id, ...editValues } = productToEdit;
  const isEditSession = Boolean(_id);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const addForm = useRef();
  const initialForm = {
    product_name: productToEdit ? productToEdit.product_name : "",
    product_description: productToEdit ? productToEdit.product_description : "",
    product_price: productToEdit ? productToEdit.product_price : 1,
    product_image: productToEdit ? productToEdit.product_image : "",
    categories: productToEdit ? productToEdit.categories : "",
    featured: productToEdit ? productToEdit.featured : "",
    stock: productToEdit ? productToEdit.stock : 1,
    company: productToEdit ? productToEdit.company : "",
  };
  const [values, setValues] = useState(initialForm);

  function onSubmit(data) {
    if (isEditSession) {
      const formD = new FormData(addForm.current);
      if (productToEdit && data.product_image.length === 0) {
        formD.append("product_image", productToEdit.product_image);
      }
      formD.append("categories", JSON.stringify(chosenCategories));
      editProduct(
        { newProductData: formD, id: productToEdit._id },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      const formD = new FormData(addForm.current);
      formD.append("categories", JSON.stringify(chosenCategories));
      createProduct(formD, {
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
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      ref={addForm}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Product name" error={errors?.product_name?.message}>
        <Input
          type="text"
          id="product_name"
          disabled={isWorking}
          {...register("product_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Stock" error={errors?.stock?.message}>
        <Input
          type="number"
          id="stock"
          disabled={isWorking}
          {...register("stock", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Stock should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.product_price?.message}>
        <Input
          type="number"
          id="product_price"
          disabled={isWorking}
          {...register("product_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().product_price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.product_description?.message}>
        <Textarea
          type="number"
          id="product_description"
          defaultValue=""
          disabled={isWorking}
          {...register("product_description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Product image">
        <FileInput
          id="product_image"
          accept="image/*"
          {...register("product_image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Categories">
        <SelectCategory
          disabled={isWorking}
          isRequired={true}
          chosenCategories={chosenCategories}
          setChosenCategories={setChosenCategories}
          values={values}
          setValues={setValues}
        />
      </FormRow>

      <FormRow label="Featured" error={errors?.featured?.message}>
        <Input
          type="text"
          id="featured"
          disabled={isWorking}
          {...register("featured", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Company" error={errors?.company?.message}>
        <Input
          type="text"
          id="company"
          disabled={isWorking}
          {...register("company", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Stars" error={errors?.stars?.message}>
        <Input
          type="number"
          id="stars"
          disabled={isWorking}
          {...register("stars", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Stock should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Review" error={errors?.reviews?.message}>
        <Input
          type="number"
          id="reviews"
          disabled={isWorking}
          {...register("reviews", {
            required: "This field is required",
            min: {
              value: 1,
              message: "review should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit product" : "Create new product"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
