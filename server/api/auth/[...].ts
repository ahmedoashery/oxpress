import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from '~/prisma/db'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  pages: {
    signIn: "/login",
  },

  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { username: string; password: string }) {
        // TODO: Fetch user from database
        const user = {name: 'Ahmed Omar', username: 'ahmedo', password: '123' }

        
        if (credentials?.username === user.username && credentials?.password === user.password) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          console.error('Warning: login attempt failed, bad credentials provided')

          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      console.log("Session From JWT "  + JSON.stringify(session))
      session.user = {
        ...token,
        ...session.user,
      };

      return session;
    },
  },
});
