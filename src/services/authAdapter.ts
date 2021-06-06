import { UserName } from "../domain/user";

import { AuthenticationService } from "../application/ports";
import { fakeApi } from "./api";

export function useAuth(): AuthenticationService {
  return {
    auth(name: UserName, email: Email) {
      return fakeApi({
        name,
        email,
        id: "sample-user-id",
        allergies: ["cocoa", "cherry"],
        preferences: ["marshmallow", "peanuts"],
      });
    },
  };
}
