export enum NOTIFICATION {
  RISE = 'Rise_error',
  HIDE = 'Hide_error',
}

export enum NotificationType {
  NORMAL = 'NORMAL-NOTIFICATION',
  SPECIAL = 'SPECIAL-NOTIFICATION',
}

export type NotificationDataProps = {
  message: string;
};

export type NotificationProps = {
  data: NotificationDataProps;
  type?: NotificationType;
  duration?: number;
};

export type InitialStateType = {
  data: NotificationProps[];
};
