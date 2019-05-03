import React from "react";
import EditProfilePresenter from "./EditProfilePresenter";
import { ME, EDIT_PROFILE } from "./EditProfileQueries";
import { useQuery, useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const { data, loading } = useQuery(ME);
  // const { username, email, firstName, lastName, bio, avatar } = data.me;

  // const usernameInput = useInput(username);
  // const firstNameInput = useInput(firstName);
  // const lastNameInput = useInput(lastName);
  // const bioInput = useInput(bio);
  // const emailInput = useInput(email);

  const usernameInput = useInput("");
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const bioInput = useInput("");
  const emailInput = useInput("");

  const editProfileMutation = useMutation(EDIT_PROFILE, {
    variables: {
      email: emailInput.value,
      username: usernameInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      bio: bioInput.value
    }
  });



  const onSubmit = async e => {
    e.preventDefault();
    try {
      const { editData } = await editProfileMutation();
      console.log(editData);
      toast.success("프로필 정보가 수정되었습니다.");
    } catch (e) {
      console.log(e);
      toast.error("다시 시도해주세요.");
    }
  };

  return (
    <EditProfilePresenter
      usernameInput={usernameInput}
      firstNameInput={firstNameInput}
      lastNameInput={lastNameInput}
      emailInput={emailInput}
      bioInput={bioInput}
      data={data}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};
