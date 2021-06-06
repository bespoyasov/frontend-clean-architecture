import { UserName } from "../domain/user";
import { useAuth } from "../services/authAdapter";
import { useUserStorage } from "../services/storageAdapter";

// Notice, that port interfaces belong to application layer
// and their implementation belongs to ports-and-adapters layer.
import { AuthenticationService, UserStorageService } from "./ports";

export function useAuthenticate() {
  // Usually, we would use Dependency Injection to get services.
  // Here, we use React.hooks as DI. Notice that `authenticate` function
  // doesn't call any 3-party services itself, it only relies on ports' interfaces.
  const storage: UserStorageService = useUserStorage();
  const auth: AuthenticationService = useAuth();

  // Ideally, it would take a command as an argument.
  async function authenticate(name: UserName, email: Email): Promise<void> {
    // We can validate values here if necessary.
    const user = await auth.auth(name, email);
    storage.updateUser(user);
  }

  return {
    user: storage.user,
    authenticate,
  };
}
