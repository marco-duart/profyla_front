//NATIVE
import React from "react";

//LIBRARIES

//COMPONENTS
import { JobPosting } from "../../../services/jobPosting/DTO";

//STYLES
import * as S from "./styles";

//UTILS

interface CardProps {
  job: JobPosting;
  onDetail: (job: JobPosting) => void;
}

const JobCard: React.FC<CardProps> = ({ job, onDetail }) => {
  return (
    <S.BaseCardStyle pointer={true} onClick={() => onDetail(job)}>
      <S.BaseCardTitleDivStyle>
        <S.BaseCardTitleStyle>{job.title}</S.BaseCardTitleStyle>
      </S.BaseCardTitleDivStyle>
      <S.BaseCardContentStyle>
        <div>
          <span>Salário: </span> {job.salary}
        </div>
        <div>
          <span>Horário: </span> {job.work_schedule}
        </div>
        <div>
          <span>Regime: </span> {job.regime}
        </div>
      </S.BaseCardContentStyle>
    </S.BaseCardStyle>
  );
};

export default JobCard;
