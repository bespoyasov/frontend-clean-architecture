import { UserName } from "../domain/user";
import { useAuth } from "../services/authAdapter";
import { useUserStorage } from "../services/storageAdapter";

// Обратите внимание, что интерфейсы портов находятся в _прикладном слое_,
// а вот их реализация — в слое _адаптеров_.
import { AuthenticationService, UserStorageService } from "./ports";

export function useAuthenticate() {
  // Обычно получение сервисов работает через Dependency Injection.
  // Тут мы можем использовать хуки как кустарный ”DI-контейнер“.

  // Функция юз-кейса не вызывает сторонние сервисы напрямую,
  // вместо этого она полагается на интерфейсы, которые объявлены ранее.
  const storage: UserStorageService = useUserStorage();
  const auth: AuthenticationService = useAuth();

  // В идеале мы бы передали аргументом команду,
  // которая бы инкапсулировала все входные данные.
  async function authenticate(name: UserName, email: Email): Promise<void> {
    const user = await auth.auth(name, email);
    storage.updateUser(user);
  }

  return {
    user: storage.user,
    authenticate,
  };
}
