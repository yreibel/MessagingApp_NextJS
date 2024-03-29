import { z } from 'zod';

export const registrationFormSchema = z.object({
    nickname: z
        .string({ required_error: 'Nickname is required' })
        .min(1, { message: 'You must enter a nickname' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone_number: z
        .string()
        .min(1, { message: 'You must enter a phone number' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(1, { message: 'You must enter a password' })
        .min(8, { message: 'The password is too short' }),
});

export const loginFormSchema = z.object({
    email: z.string({ required_error: 'Email required' }).email(),
    password: z
        .string({ required_error: 'Password is required' })
        .min(1, { message: 'You must enter a password' })
        .min(8, { message: 'The password is too short' }),
});
