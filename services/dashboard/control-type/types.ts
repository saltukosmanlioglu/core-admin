import { ApiResponse } from "../base";

export interface ControlType {
  name: string;
}

export type GetControlTypeResponse = Array<ControlType>;
