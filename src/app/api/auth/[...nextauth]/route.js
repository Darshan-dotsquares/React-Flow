"use server";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../Model/user.model";
import { dbConnection } from "../../dbconnection";
import bcrypt from "bcryptjs"; 

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials; // Type assertion
        try {
          await dbConnection();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error", error);
          return null; // Return null on error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {

        return {
          ...token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          companyName: user.companyName,
          jobTitle: user.jobTitle,
          phoneNumber: user.phoneNumber,
          country: user.country,
        };
      }

      if (trigger === "update") {
        const { firstName, lastName, email, companyName, jobTitle, phoneNumber, country } = session.user;
        return { ...token, firstName, lastName, email, companyName, jobTitle, phoneNumber, country };
      }
      // console.log("token", token);

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...token
        };
      }
      // console.log("session", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
