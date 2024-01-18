import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "../authentication/useSignup";
import { useEditCustomer } from "./useEditCustomer";
import { useCreateCustomer } from "./useCreateCustomer";

function CustomerSignupForm({ customerToEdit = {}, onCloseModal }) {
  const { _id, ...editValues } = customerToEdit;
  const isEditSession = Boolean(_id);

  const { isLoading } = useSignup();
  const { createCustomer } = useCreateCustomer();
  const { editCustomer } = useEditCustomer();
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      editCustomer(
        { newCustomerData: { data }, id: customerToEdit._id },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCustomer(data, {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="number"
          id="phone"
          disabled={isLoading}
          {...register("phone", {
            required: "This field is required",
            // minLength: {
            //   value: 8,
            //   message: "Password needs a minimum of 8 characters",
            // },
          })}
        />
      </FormRow>

      {!isEditSession && (
        <>
          <FormRow
            label="Password (min 8 characters)"
            error={errors?.password?.message}
          >
            <Input
              type="password"
              id="password"
              disabled={isLoading}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Repeat password"
            error={errors?.passwordConfirm?.message}
          >
            <Input
              type="password"
              id="passwordConfirm"
              disabled={isLoading}
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
          </FormRow>
        </>
      )}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit customer" : "Create new customer"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CustomerSignupForm;
