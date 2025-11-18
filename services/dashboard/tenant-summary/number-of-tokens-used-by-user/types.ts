export interface NumberOfTokenUsedByUser {
  label: string;
  limit: number;
  used: number;
}

export type GetNumberOfTokenUsedByUserResponse = Array<NumberOfTokenUsedByUser>