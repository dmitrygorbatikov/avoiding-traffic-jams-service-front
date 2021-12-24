import {RootState} from "../root/store";
import {UserProfile} from "./types";

export const userProfileSelector = (state: RootState) => state.user.profile as UserProfile
export const usersListSelector = (state: RootState) => state.user.users as any[]
export const getUserProfileLoadingSelector = (state: RootState) => state.user.profileLoading as boolean
export const usersLoadingSelector = (state: RootState) => state.user.usersLoading as boolean
export const selectButtonSelector = (state: RootState) => state.user.selectButton as string
