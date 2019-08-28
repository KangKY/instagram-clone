import React, {useState} from "react";
import UploadPostPresenter from "./UploadPostPresenter";
import { ME, EDIT_PROFILE } from "./UploadPostQueries";
import { useQuery, useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// uppy
import Uppy from '@uppy/core';

export default () => {

  const usernameInput = useInput("");
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const bioInput = useInput("");
  const emailInput = useInput("");

  const [modalOpen, setModalOpen] = useState(false);


  const editProfileMutation = useMutation(EDIT_PROFILE, {
    variables: {
      email: emailInput.value,
      username: usernameInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      bio: bioInput.value
    }
  });

  const uppy = Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 1000000,
      maxNumberOfFiles: 3,
      minNumberOfFiles: 2,
      allowedFileTypes: ['image/*', 'video/*']
    }
  });
  // .use(Dashboard, {
  //   trigger: '.UppyModalOpenerBtn',
  //   inline: true,
  //   target: '.DashboardContainer',
  //   replaceTargetContent: true,
  //   showProgressDetails: true,
  //   note: 'Images and video only, 2–3 files, up to 1 MB',
  //   height: 470,
  //   metaFields: [
  //     { id: 'name', name: 'Name', placeholder: 'file name' },
  //     { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
  //   ],
  //   browserBackButtonClose: true
  // })
  // .use(GoogleDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  // .use(Dropbox, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  // .use(Instagram, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  // .use(Webcam, { target: Dashboard })
  // .use(Tus, { endpoint: 'https://master.tus.io/files/' })
  
  uppy.on('complete', result => {
    console.log('successful files:', result.successful)
    console.log('failed files:', result.failed)
  });
  


  const toggleModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

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
    <UploadPostPresenter
      usernameInput={usernameInput}
      firstNameInput={firstNameInput}
      lastNameInput={lastNameInput}
      emailInput={emailInput}
      bioInput={bioInput}
      onSubmit={onSubmit}
      modalOpen={modalOpen}
      toggleModal={toggleModal}
      uppy={uppy}
    />
  );
};
