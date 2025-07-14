import { DefaultSession, DefaultUser, Session } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";
declare module "next-auth" {
    interface User {
        national_code?: string;
        role?: string;
    }
    interface Session extends DefaultSession {
        user: {
            id?: string;
            name?: string;
            national_code?: string;
            role?: string;
        };
    }

    interface JWT extends DefaultJWT {
        id?: string;
        name?: string;
        national_code?: string;
        role?: string;
    }


}



// declare module "next-auth" {
//     interface User {
//         id?: string;
//         name?: string;
//         national_code?: string;
//     }

//     interface Session {
//         user: {
//             id?: string;
//             name?: string;
//             national_code?: string;
//         };
//     }

//     interface JWT {
//         id?: string;
//         name?: string;
//         national_code?: string;
//     }
// }