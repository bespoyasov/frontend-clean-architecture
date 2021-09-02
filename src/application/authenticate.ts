import { UserName } from "../domain/user";
import { useAuth } from "../services/authAdapter";
import { useUserStorage } from "../services/storageAdapter";

// Note that the port interfaces are in the _application layer_,
// but their implementation is in the _adapter_ layer.
import { AuthenticationService, UserStorageService } from "./ports";

export function useAuthenticate() {
  // Usually, getting services works through Dependency Injection.
  // Here we can use hooks as a crude "DI-container".

  // The usecase function does not call third-party services directly,
  // instead, it relies on interfaces that were declared earlier.
  const storage: UserStorageService = useUserStorage();
  const auth: AuthenticationService = useAuth();

  // Ideally, we would pass a command as an argument,
  // which would encapsulate all input data.
  async function authenticate(name: UserName, email: Email): Promise<void> {
    const user = await auth.auth(name, email);
    storage.updateUser(user);
  }

  return {
    user: storage.user,
    authenticate,
  };
}
