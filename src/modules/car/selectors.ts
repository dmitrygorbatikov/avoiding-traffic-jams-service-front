import {RootState} from "../root/store";

export const carSelector = (state: RootState) => state.car.car as any
export const carLoadingSelector = (state: RootState) => state.car.loading as boolean
