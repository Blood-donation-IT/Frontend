export enum NotificationType {
  UNKNOWN = "NOTIFICATION_TYPE_UNKNOWN",
  DONATION_REMINDER = "DONATION_REMINDER",
  DONATION_UPDATE = "DONATION_UPDATE",
  ACCOUNT_UPDATE = "ACCOUNT_UPDATE",
  SYSTEM_MESSAGE = "SYSTEM_MESSAGE",
}

export interface Notification {
  notification_id: number;
  user_id: number;
  title: string;
  message: string;
  created_at: string | null;
  is_read: boolean;
  type: NotificationType;
}