import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import excuteQuery from "../../../config/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "youremail@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // database look up
        let returnUser = null;
        let user = await excuteQuery({
          query: "SELECT * FROM users WHERE email = ?",
          values: [credentials.username],
        });

        user = JSON.stringify(user);
        user = JSON.parse(user);
        if (user.length > 0) {
          await bcrypt.compare(credentials.password, user[0].password).then((res) => {
            if (res === true) {
                returnUser = {
                id: user[0].id,
                email: user[0].email,
              };
            } else {
                returnUser = null;
            }
          });
        }
        return returnUser;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default NextAuth(authOptions);
