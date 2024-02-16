import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import { IUserD } from '@/models/UserModel';
import { getUserByEmail } from '@/utils/db_functions';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    jwt: {
        // JWT encoding and decoding configurations
    },
    callbacks: {
        // signIn, session callbacks
    },
    pages: {
        signIn: '/auth/login', // Custom sign-in page
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                console.log('AUTHORIZE FUNCTION');
                // Add logic to verify credentials here
                if (!credentials) return null;
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const user = await getUserByEmail(email);

                if (user !== null) {
                    // Any object returned will be saved in `user` property of the JWT
                    if (bcrypt.compareSync(password, user.password)) {
                        return {
                            id: user._id.toString(),
                            nickname: user.nickname,
                            email: user.email,
                        };
                    }
                    return null;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
};

export default NextAuth(authOptions);
