export interface UserActivity {
  date: string;
  primary: number;
  secondary: number;
}

export type GetUserActivityResponse = Array<UserActivity>