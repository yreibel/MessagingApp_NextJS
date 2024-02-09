'use server';

import { loginFormSchema, registrationFormSchema } from '@/utils/_validation';
import { decodeForm } from '@/lib/utils';

import { DisplayableUser, DisplayableUserLogin } from '@/utils/types';

import bcrypt from 'bcrypt';

import { connectMongo } from '@/utils/connectMongo';

import User from '@/models/UserModel';

export type FormState = {
    user?: DisplayableUser | null;
    success: boolean;
};

export type FormStateLogin = {
    user?: DisplayableUserLogin | null;
    success: boolean;
};

/*export async function returnMessage(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    console.log(formData);

    const { email } = await decodeForm(formData, registrationFormSchema);

    console.log(email);
    if (email !== null) {
        return {
            message: email,
            success: true,
        };
    }

    return {
        success: false,
    };
}*/

export async function registerUser(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
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

        await user.save();

        return {
            user: { nickname: nickname, email: email },
            success: true,
        };
    }
}

export async function loginUser(
    prevState: FormStateLogin,
    formData: FormData,
): Promise<FormStateLogin> {
    console.log(formData);

    const user = await decodeForm(formData, loginFormSchema);

    const parsedUser = loginFormSchema.parse(user);

    const { email, password } = parsedUser;

    console.log(email);
    if (email !== null && password !== null) {
        return {
            user: { email: email },
            success: true,
        };
    }

    return {
        success: false,
    };
}
