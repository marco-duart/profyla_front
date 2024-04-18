//NATIVE

//LIBRARIES
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//COMPONENTS
import BaseButton from "../shared/buttons/base-button";
//STYLES
import * as S from "./styles";
//UTILS
import { FORM_MESSAGE } from "../../utils/enums/form-message";
import { RequestSupport } from "../../services/support";
import * as CONSTANTES from "../../utils/constants/constants";
import { useUserContext } from "../../hooks/use-user-context";
import { SUCCESSFUL_MESSAGE } from "../../utils/enums/successful-message";
import { EXCEPTION_MESSAGE } from "../../utils/enums/exception-message";

const supportFormSchema = z.object({
  email: z
    .string()
    .min(6, FORM_MESSAGE.EMAIL)
    .email(FORM_MESSAGE.EMAIL_FORMAT)
    .toLowerCase(),
  motive: z.string(),
  description: z.string(),
});

type supportFormData = z.infer<typeof supportFormSchema>;

type Props = {
  handleMessage: (message: string) => void;
};

const SupportForm: React.FC<Props> = ({ handleMessage }) => {
  const { user } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<supportFormData>({
    resolver: zodResolver(supportFormSchema),
  });

  const onSubmit = async (data: supportFormData) => {
    if (user) {
      const id = user.id;
      const { email, ...rest } = data;
      const fetchData = { id, email, ...rest };
      const result = await RequestSupport(fetchData);
      if (result.success) {
        handleMessage(SUCCESSFUL_MESSAGE.SUPPORT_REQUEST_SENDED);
      } else {
        handleMessage(EXCEPTION_MESSAGE.SUPPORT_REQUEST_FAILED);
      }
      console.log(fetchData);
    }
  };

  return (
    <S.SupportFormStyle onSubmit={handleSubmit(onSubmit)}>
      <S.BaseTitleFormStyle>Suporte</S.BaseTitleFormStyle>
      <div>
        <label htmlFor="email" hidden>
          Email
        </label>
        <S.BaseInputFormStyle
          {...register("email")}
          type="text"
          placeholder="email para contato"
          error={errors.email ? true : false}
        />
        {errors.email && (
          <S.BaseSmallFormStyle>{errors.email.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <div>
        <label htmlFor="motivo" hidden>
          Motivo
        </label>
        <S.SelectFormStyle {...register("motive")}>
          {CONSTANTES.MOTIVE.map((value) => {
            return <option value={value}>{value}</option>;
          })}
        </S.SelectFormStyle>
      </div>
      <div>
        <label htmlFor="descricao" hidden>
          Descrição
        </label>
        <S.TextareaFormStyle
          {...register("description")}
          placeholder="descricao"
        />
      </div>
      <BaseButton type={"submit"}>CONFIRMAR</BaseButton>
    </S.SupportFormStyle>
  );
};

export default SupportForm;
