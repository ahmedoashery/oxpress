import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID || 'enter-your-client-id-here',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || 'enter-your-client-secret-here' // TODO: Replace this with an env var like "process.env.GITHUB_CLIENT_SECRET". The secret should never end up in your github repository
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {},
            async authorize(credentials: any) {
                // find user in db


                // compare password

                // sign new token

                // return token object to frontend
                const data = {
                    user: {
                        name: 'John Doe',
                        email: 'john@email.com',
                        id: 1,
                        role: 'admin'
                    },
                    token: '123456890',
                }
                if (data.user) {
                    const u = {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        role: data.user.role, // additional field
                        access_token: data.token, // additional field
                    };
                    return u;
                } else {
                    throw createError({
                        statusCode: 403,
                        statusMessage: "Credentials not working",
                    });
                }
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async ({ token, user }) => {
            console.log(token, '\n', user)
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.jwt = user ? (user as any).access_token || '' : '';
                token.id = user ? user.id || '' : '';
                token.role = user ? (user as any).role || '' : '';
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({ session, token }) => {
            (session as any).role = token.role;
            (session as any).uid = token.id;
            return Promise.resolve(session);
        },
    },
    pages: {
        signIn: '/login-v2',
    },
})
