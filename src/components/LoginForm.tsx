'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

import React, { FormEvent, useEffect } from 'react';

import {
    useForm,
    FieldErrors,
    UseFormRegister,
    SubmitHandler,
} from 'react-hook-form';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormStateLogin } from '@/utils/_server_actions';
//import { loginUser } from '@/utils/_server_actions';

import { loginFormSchema as schema } from '@/utils/_validation';
import { signIn } from 'next-auth/react';

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
        setFocus,
    } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'all' });

    const submitForm: SubmitHandler<FormValues> = async (data) => {
        console.log('test');

        const credentials = {
            email: data.email,
            password: data.password,
            redirect: false,
        };

        console.log(credentials);

        const res = await signIn('credentials', credentials);

        if (res?.error) {
            console.log(res.error);
        }

        console.log(res);
    };

    /*const [formState, formAction] = useFormState(loginUser, {
        success: false,
        user: { email: '', password: '' },
    });*/

    /*useEffect(() => {
        // Call the server action function

        const executeSignIn = async () => {
            const res = await signIn('credentials', {
                email: formState.user?.email,
                password: formState.user?.password,
                redirect: false,
            });

            console.log(res);
        };

        if (formState.success) {
            executeSignIn().catch(console.error);
        }

        console.log('lo');
    }, [formState.success, formState.user]);
    */

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <LoginFormContent
                register={register}
                isValid={isValid}
                errors={errors}
            />
        </form>
    );
}

export function LoginFormContent({
    register,
    isValid,
    errors,
}: {
    register: UseFormRegister<FormValues>;
    isValid: boolean;
    errors: FieldErrors<FormValues>;
}) {
    return (
        <div className="flex flex-col gap-4 w-1/2">
            <Input {...register('email')} type="email" placeholder="Email" />
            {errors.email && (
                <div className="text-xs">{errors.email.message}</div>
            )}
            <Input
                {...register('password')}
                type="password"
                placeholder="Password"
            />
            {errors.password && (
                <div className="text-xs">{errors.password.message}</div>
            )}

            <Button type="submit">Login</Button>
        </div>
    );
}
