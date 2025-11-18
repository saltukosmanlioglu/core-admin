export interface UserEngagement {
  color: string;
  name: string;
  subtitle: string;
  value: string;
}

export type GetUserEngagementResponse = Array<UserEngagement>