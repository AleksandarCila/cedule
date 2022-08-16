import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: "Email", type: "email", placeholder: "youremail@mail.com"

                },
                password: {
                    label: "Password", type: "password"

                }
            },
            authorize: (credentials) => {

                // database look up
                if (credentials.username === "john@test.com" && credentials.password === "test") {
                    return {
                        id: 2,
                        name: 'John',
                        email: 'johndoe@test.com'
                    }
                }
                // login failed
                else return null;
            }
        })
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
        }
    },
    secret: "test",
    // pages:{
    //     signin:
    // }
    jwt: {
        secret: "test",
        encryption: true,
    },
}

export default NextAuth(authOptions)