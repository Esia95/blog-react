import { notification } from "antd";

export const showSuccessNotification = (message = "Done") =>
  notification.success({ message });
