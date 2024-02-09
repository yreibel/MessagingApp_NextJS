'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

import React, { FormEvent } from 'react';

import { useForm, FieldErrors, UseFormRegister } from 'react-hook-form';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormStateLogin } from '@/utils/_server_actions';
import { loginUser } from '@/utils/_server_actions';

import { loginFormSchema as schema } from '@/utils/_validation';

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
        setFocus,
    } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'all' });

    const [formState, formAction] = useFormState(loginUser, {
        success: false,
        user: { email: '' },
    });

    return (
        <form action={formAction}>
            <LoginFormContent
                register={register}
                isValid={isValid}
                errors={errors}
                formState={formState}
            />
        </form>
    );
}

export function LoginFormContent({
    register,
    isValid,
    errors,
    formState,
}: {
    register: UseFormRegister<FormValues>;
    isValid: boolean;
    errors: FieldErrors<FormValues>;
    formState: FormStateLogin;
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

            <div>{formState.user?.email}</div>

            <Button type="submit">Login</Button>
        </div>
    );
}
