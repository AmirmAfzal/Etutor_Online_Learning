import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
    national_code?: string;
    role?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      name?: string;
      role?: string;
    };
  }

  interface JWT extends DefaultJWT {
    id?: string;
    name?: string;
    role?: string;
  }
}
