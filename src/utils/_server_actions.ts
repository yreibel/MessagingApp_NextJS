'use server';

import { loginFormSchema, registrationFormSchema } from '@/utils/_validation';
import { decodeForm } from '@/lib/utils';

import { DisplayableUserRegister, DisplayableUserLogin } from '@/utils/types';

import bcrypt from 'bcrypt';

import { connectMongo } from '@/utils/connectMongo';

import User from '@/models/UserModel';

import { signIn } from 'next-auth/react';
import { checkIfEmailExists } from './db_functions';

export type FormStateRegister = {
    user?: DisplayableUserRegister | null;
    success: boolean;
};

export type FormStateLogin = {
    user?: DisplayableUserLogin | null;
    success: boolean;
};

/**
 * Server action to register the user
 * @param prevState
 * @param formData
 * @returns
 */
export async function registerUser(
    prevState: FormStateRegister,
    formData: FormData,
): Promise<FormStateRegister> {
    console.log(formData);

    const user = await decodeForm(formData, registrationFormSchema);

    const parsedUser = registrationFormSchema.safeParse(user);

    if (!parsedUser.success) {
        // handle error then return
        return {
            success: false,
        };
    } else {
        const { nickname, email, phone_number, password } = parsedUser.data;
        console.log(email);

        if (
            email === null ||
            nickname === null ||
            phone_number === null ||
            password === null
        ) {
            return {
                success: false,
            };
        }

        // Do sth

        let client;
        try {
            client = await connectMongo();

            console.log('DB connected');
        } catch (error) {
            console.log('error : ', error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            nickname: nickname,
            phone_number: phone_number,
            email: email,
            password: hashedPassword,
            messages: [],
        };

        const user = new User(newUser);
        console.log(user);

        const res = await user.save();

        if (res.error) {
            return {
                success: false,
            };
        }

        return {
            user: { nickname: nickname, email: email, password: password },
            success: true,
        };
    }
}

/**
 * Server action to proceed to email verification in the db (is there an existing mail already)
 * @param email
 * @returns
 */
export async function verifEmail(email: string) {
    const exists = await checkIfEmailExists(email);
    return exists;
}

/*export async function loginUser(
    prevState: FormStateLogin,
    formData: FormData,
): Promise<FormStateLogin> {
    console.log(formData);
    console.log('LOGIN USER SERVER ACTION');

    const user = await decodeForm(formData, loginFormSchema);

    const parsedUser = loginFormSchema.parse(user);

    const { email, password } = parsedUser;

    if (email !== null && password !== null) {
        return {
            user: { email: email, password: password },
            success: true,
        };
    }

    return {
        success: false,
    };
}
*/
