import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm(user) {
  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(user.user.manager_name);
  const [user_phone, setPhone] = useState(user.user.manager_phone);
  const [user_address, setAddress] = useState(user.user.manager_address);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      {
        _id: user.user._id,
        fullName,
        user_phone,
        user_address,
        avatar,
      },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(user.name);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user.email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Phone">
        <Input
          type="number"
          value={user_phone}
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Address">
        <Input
          type="text"
          value={user_address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
