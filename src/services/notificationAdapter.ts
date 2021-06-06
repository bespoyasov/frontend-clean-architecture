import { NotificationService } from "../application/ports";

export function useNotifier(): NotificationService {
  return {
    notify: (message: string) => window.alert(message),
  };
}
