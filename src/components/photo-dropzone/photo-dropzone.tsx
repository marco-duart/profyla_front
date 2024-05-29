//NATIVE
import React from "react";
//LIBRARIES
import { useDropzone } from "react-dropzone";
//COMPONENTS
import { useUserConfiguration } from "../../hooks/user/use-user-configuration";
//STYLES
import * as S from "./styles";
//UTILS

type Props = {
  userPhotoUrl: string;
};

const PhotoDropzone: React.FC<Props> = ({ userPhotoUrl }) => {
  const { changePhoto } = useUserConfiguration();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      changePhoto(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  return (
    <div>
      <S.DropzoneDivStyle {...getRootProps()}>
        <input {...getInputProps()} />
        <label htmlFor="photoInput">
          <S.ImgStyle src={userPhotoUrl} alt="photo" />
        </label>
      </S.DropzoneDivStyle>
    </div>
  );
};

export default PhotoDropzone;
