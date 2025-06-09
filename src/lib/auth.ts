import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import twilio from "twilio";

function formatPhoneNumber(phone: string): string {
  // force the phone number to be in the USA
  const cleaned = phone.replace(/[()]/g, "").replace(/-/g, " ");
  if (phone.startsWith("+1")) {
    return cleaned;
  } else {
    return `+1 ${cleaned}`;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otpValue: { label: "OTP", type: "text" },
        signup: { label: "Sign Up", type: "boolean" },
      },
      authorize: async (credentials) => {
        const prisma = new PrismaClient();
        console.log(formatPhoneNumber(credentials?.phoneNumber));
        if (credentials?.signup) {
          const user = await prisma.visitors_master.findFirst({
            where: {
              phonenumber: formatPhoneNumber(credentials.phoneNumber),
            },
          });
          if (!user) {
            throw new Error("User not found");
          }
          return { id: user.id } as any;
        } else {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;

          const service = process.env.TWILIO_SERVICE_SID || "";

          const client = twilio(accountSid, authToken);
          if (!credentials) {
            throw new Error("No credentials provided");
          }
          const verificationCheck = await client.verify.v2
            .services(service)
            .verificationChecks.create({
              to: formatPhoneNumber(credentials.phoneNumber),
              code: credentials.otpValue,
            });
          if (verificationCheck.status === "approved") {
            const user = await prisma.visitors_master.findFirst({
              where: {
                phonenumber: formatPhoneNumber(credentials.phoneNumber),
              },
            });
            if (!user) {
              throw new Error("User not found");
            }
            user.last_signed_in = new Date().toISOString();
            await prisma.visitors_master.update({
              where: {
                id: user.id,
              },
              data: {
                last_signed_in: user.last_signed_in,
              },
            });
            await prisma.$disconnect();
            return { id: user.id } as any;
          } else {
            throw new Error("Invalid OTP");
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
};
