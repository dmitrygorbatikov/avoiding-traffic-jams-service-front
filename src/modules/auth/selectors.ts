import {RootState} from "../root/store";

export const tokenSelector = (state: RootState) => state.auth.token
export const languageSelector = (state: RootState) => state.auth.language
export const errorSelector = (state: RootState) => state.auth.error
export const loadingSelector = (state: RootState) => state.auth.authLoading
