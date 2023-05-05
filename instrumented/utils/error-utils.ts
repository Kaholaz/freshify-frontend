import { ElNotification } from "element-plus";

export function showError(title: string, message: string, duration: number | null = null): void {
  ElNotification({
    title,
    message,
    type: "error",
    duration: duration || 4500,
  });
}
