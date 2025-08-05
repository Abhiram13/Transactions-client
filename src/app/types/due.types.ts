import { TransactionNS } from "./export.types";

export namespace DueListNS {
    export interface IDue {
        description: string;
        id: string;
    }
}

export namespace DueDetailsNS {
    export enum Status {
        Active = 1,
        Ended = 2,
        Hold = 3,
        InProgress = 4,
        InActive = 5
    }

    export enum Type {
        Fixed = 1,
        NonFixed = 2,
    }

    export interface IDue {
        payee: string;
        principal_amount: number;
        description: string;
        start_date: string;
        end_date?: string;
        comment: string;
        status: Status,
        to_bank: string;
        type: Type;
        id: string;
    }

    export interface ITransactions {
        amount: number;
        description: string;
        type: TransactionNS.TransactionType;
    }

    export interface IDueTransactions {
        current_principal: number;
        transactions: ITransactions[];
    }
}

export namespace DueConfigureNS {
    export interface IInsertPayload {
        principal_amount: number;
        description: string;
        status: DueDetailsNS.Status;
        payee: string;
        start_date: string | Date;
        comment: string;
        to_bank: string;
        type: DueDetailsNS.Type;
    }
}