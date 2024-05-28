import { useEffect, useState } from "react";
import { GetCandidate, GetAllCandidates, CreateCandidate } from "../../services/candidate";
import { Candidate } from "../../services/candidate/DTO";
import { useUserContext } from "../use-user-context";

type State = {
    candidates: undefined | Candidate[];
};

const INITIAL_STATE = {
    candidates: undefined,
};

export type CreateCandidateData = {
    phone_number1: string;
    phone_number2: string;
    employee: boolean;
    resume: string;
    birthplace: string;
    gender: string;
    birthdate: Date;
    marital_status: string;
    address_neighborhood: string;
    address_city: string;
    mother_name: string;
    spouse_name: string;
    number_of_children: number;
    residence_status: string;
    possessions: string;
    other_incomes: boolean;
    relatives_in_company: boolean;
    pcd: string;
    smoker: boolean;
    alcohol_consumer: boolean;
    medication_user: boolean;
    first_question: string;
    second_question: string;
    third_question: string;
    fourth_question: string;
    fifth_question: string;
    curriculum: any;
    token: string;
};

// export type UpdateCandidateData = {
// id: number;
// };

// export type DeleteCandidateData = {
// id: number;
// };

export const useCandidateCrud = () => {
    const [state, setState] = useState<State>(INITIAL_STATE);
    const { token } = useUserContext();

    const fetchCandidates = async () => {
        if (!token) {
            return;
        }

        const { candidates } = await GetAllCandidates({ token });
        setState({ candidates });
        console.log(candidates);
    };

    const createCandidate = async (data:CreateCandidateData) => {
        if (!token) {
            return;
        }

        const params = { ...data, token };
        await CreateCandidate(params);
        fetchCandidates();
    };   
    
    // const deleteCandidate = async (data:DeleteCandidateData) => {
    //     if (!token) {
    //         return;
    //     }

    //     const params = { ...data, token };
    //     await DeleteCandidate(params);
    //     fetchCandidates();
    // };

    useEffect(() => {
        fetchCandidates();
    }, []);

    return {
        candidates: state.candidates,
        createCandidate,
    };
};


