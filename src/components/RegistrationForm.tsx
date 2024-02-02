'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

import React, { FormEvent } from 'react';

import { useForm, FieldErrors, UseFormRegister } from 'react-hook-form';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//export type SubmitEvent = FormEvent<HTMLFormElement>;

import { returnMessage } from '@/utils/_server_actions';

const schema = z.object({
    nickname: z
        .string({ required_error: 'Nickname is required' })
        .min(1, { message: 'You must enter a nickname' }),
    email: z.string().email(),
    phone_number: z
        .string()
        .min(1, { message: 'You must enter a phone number' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(1, { message: 'You must enter a password' })
        .min(8, { message: 'The password is too short' }),
});

type FormValues = z.infer<typeof schema>;

export function RegistrationForm() {
    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
        setFocus,
    } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onBlur' });

    //const [formState, formAction] = useFormState(returnMessage, null);

    const onBlur = (data: FormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onBlur)}>
            <RegistrationFormContent
                register={register}
                isValid={isValid}
                errors={errors}
            ></RegistrationFormContent>
        </form>
    );
}

export function RegistrationFormContent({
    register,
    isValid,
    errors,
}: {
    register: UseFormRegister<FormValues>;
    isValid: boolean;
    errors: FieldErrors<FormValues>;
}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <div className="text-sm">Nickname</div>
                <Input
                    {...register('nickname')}
                    type="nickname"
                    placeholder="Nickname"
                />
                {errors.nickname && (
                    <div className="text-xs">{errors.nickname.message}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <div className="text-sm">Email</div>
                <Input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                />
                {errors.email && (
                    <div className="text-xs">{errors.email.message}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <div className="text-sm">Phone number</div>
                <Input
                    {...register('phone_number')}
                    type="tel"
                    placeholder="Phone number"
                />
                {errors.phone_number && (
                    <div className="text-xs">{errors.phone_number.message}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <div className="text-sm">Password</div>
                <Input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                />

                {errors.password && (
                    <div className="text-xs">{errors.password.message}</div>
                )}
            </div>

            <Button type="submit">Register</Button>
        </div>
    );
}

/*

{!isValid && (
                <Button type="submit" disabled={true}>
                    Register
                </Button>
            )}

            {isValid && <Button type="submit">Register</Button>}

            */
