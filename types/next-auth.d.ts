// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;

        };
    }

    interface User {
        id: string;

    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}
