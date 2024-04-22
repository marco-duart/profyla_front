import { useEffect, useState } from "react";

import { useUserContext } from "../use-user-context";
import {
  DeleteHiringProcess,
  CreateHiringProcess,
  UpdateHiringProcess,
  GetHiringProcess,
  GetHiringProcesses,
} from "../../services/hiringProcess";

import { HiringProcessShow } from "../../services/hiringProcess/DTO";

type State = {
    hiringProcesses: undefined | HiringProcessShow[];
};

const INITIAL_STATE = {
    hiringProcesses: undefined,
};

export type CreateHiringProcessData = {
    job_id: number;
    start_date: Date;
    end_date: Date;
    status: string;
    salary: number;
    business_name: string;
    title: string;
};
export type UpdateHiringProcessData = {
    id: number;
    start_date: Date;
    end_date: Date;
    status: string;
    salary: number;
    business_name: string;
    title: string;
};
export type DeleteHiringProcessData = {
    id: number;
};

export const useHiringProcessCrud = (prefix: string) => {
    const [state, setState] = useState<State>(INITIAL_STATE);
    const { token } = useUserContext();

    const fetchHiringProcesses = async () => {
        if (!token ) {
            return;
        }
        const { hiringProcesses } = await GetHiringProcesses({ prefix, token });
        console.log(hiringProcesses);
        setState({ hiringProcesses });
    };

    const createHiringProcess = async (data: CreateHiringProcessData) => {
        if(!token){
            return;
        }

        const params = { ...data, token };
        await CreateHiringProcess(params);
        fetchHiringProcesses();
    };

    const deleteHiringProcess = async (data: DeleteHiringProcessData) => {
        if(!token){
            return;
        }

        const params = { ...data, token };
        await DeleteHiringProcess(params);
        fetchHiringProcesses();
    }; 
    
    const updateHiringProcess = async (data: UpdateHiringProcessData) => {
        if(!token){
            return;
        }

        const params = { ...data, token };
        await UpdateHiringProcess(params);
        fetchHiringProcesses();
    };

    useEffect(() => {
        fetchHiringProcesses();
    }, []);

    return {
        hiringProcesses: state.hiringProcesses,
        createHiringProcess,
        deleteHiringProcess,
        updateHiringProcess,
    };
};






