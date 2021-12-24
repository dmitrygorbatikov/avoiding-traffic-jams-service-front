import {RootState} from "../root/store";

export const tokenSelector = (state: RootState) => state.auth.token
export const errorSelector = (state: RootState) => state.auth.error
export const loadingSelector = (state: RootState) => state.auth.authLoading
