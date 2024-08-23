import Head from "./head";

export interface HeadOutPut {
    status: number,
    message: string,
    accessToken?: string,
    data?:Head
}