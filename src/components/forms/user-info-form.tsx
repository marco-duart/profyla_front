//NATIVE
import React, { useEffect } from "react";
//LIBRARIES
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//COMPONENTS
//STYLES
import * as S from "./styles";
//UTILS

const userInfoFormSchema = z.object({
  name: z.string(),
  cpf: z.string()
});

type UserInfoFormData = z.infer<typeof userInfoFormSchema>;

type Props = {
  name: string;
  cpf: string;
};

const UserInfoForm: React.FC<Props> = ({ name, cpf }) => {
  const {
    register,
    setValue,
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoFormSchema),
  });

  useEffect(() => {
    setValue("name", name);
    setValue("cpf", cpf);
  }, []);

  return (
    <S.CrudFormStyle>
      <S.BaseSubtitleFormStyle>Nome:</S.BaseSubtitleFormStyle>
      <S.CrudInputDiv>
        <label htmlFor="name" hidden>Nome</label>
        <S.BaseInputFormStyle
          {...register("name")}
          type="text"
          disabled={true}
          error={false}
        />
      </S.CrudInputDiv>
      <S.BaseSubtitleFormStyle>CPF:</S.BaseSubtitleFormStyle>
      <S.CrudInputDiv>
        <label htmlFor="cpf" hidden>CPF</label>
        <S.BaseInputFormStyle
          {...register("cpf")}
          type="text"
          disabled={true}
          error={false}
        />
      </S.CrudInputDiv>
    </S.CrudFormStyle>
  );
};

export default UserInfoForm;
