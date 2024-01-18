import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCreateUser } from "./useCreateUser.js";
import { useEditUser } from "./useEditUser.js";

function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const { createUser, isCreating } = useCreateUser();
  const { isEditing, editUser } = useEditUser();
  const isWorking = isCreating || isEditing;
  const { _id, ...editValues } = userToEdit;
  const isEditSession = Boolean(_id);
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      editUser(
        { newUserData: { data }, id: userToEdit._id },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createUser(data, {
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
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("phone", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          disabled={isWorking}
          {...register("address")}
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
              disabled={isWorking}
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
              disabled={isWorking}
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
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit user" : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
