import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCreateManager } from "./useCreateManager";
import { useEditManager } from "./useEditManager";

function CreateManagerForm({ managerToEdit = {}, onCloseModal }) {
  const { createManager, isCreating } = useCreateManager();
  const { isEditing, editManager } = useEditManager();
  const isWorking = isCreating || isEditing;
  const { _id, ...editValues } = managerToEdit;
  const isEditSession = Boolean(_id);
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      editManager(
        { newManagerData: { data }, id: managerToEdit._id },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createManager(data, {
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
      <FormRow label="Full name" error={errors?.manager_name?.message}>
        <Input
          type="text"
          id="manager_name"
          disabled={isWorking}
          {...register("manager_name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.manager_email?.message}>
        <Input
          type="manager_email"
          id="manager_email"
          disabled={isWorking}
          {...register("manager_email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Phone" error={errors?.manager_phone?.message}>
        <Input
          type="number"
          id="manager_phone"
          disabled={isWorking}
          {...register("manager_phone", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Address" error={errors?.manager_address?.message}>
        <Input
          type="text"
          id="manager_address"
          disabled={isWorking}
          {...register("manager_address")}
        />
      </FormRow>

      {!isEditSession && (
        <>
          <FormRow
            label="Password (min 8 characters)"
            error={errors?.manager_password?.message}
          >
            <Input
              type="password"
              id="manager_password"
              disabled={isWorking}
              {...register("manager_password", {
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
                  value === getValues().manager_password ||
                  "Passwords need to match",
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
          {isEditSession ? "Edit manager" : "Create new manager"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateManagerForm;
