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

import { Loader2 } from 'lucide-react';

//export type SubmitEvent = FormEvent<HTMLFormElement>;

import { FormState } from '@/utils/_server_actions';
import { returnMessage } from '@/utils/_server_actions';

import { registrationFormSchema as schema } from '@/utils/_validation';

type FormValues = z.infer<typeof schema>;

export function RegistrationForm() {
    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
        setFocus,
    } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'all' });

    const [formState, formAction] = useFormState(returnMessage, {
        success: false,
        message: 'lll',
    });

    /*const onBlur = (data: FormValues) => {
        console.log(data);
    };*/

    return (
        <form action={formAction}>
            <RegistrationFormContent
                register={register}
                isValid={isValid}
                errors={errors}
                formState={formState}
            ></RegistrationFormContent>
        </form>
    );
}

export function RegistrationFormContent({
    register,
    isValid,
    errors,
    formState,
}: {
    register: UseFormRegister<FormValues>;
    isValid: boolean;
    errors: FieldErrors<FormValues>;
    formState: FormState;
}) {
    const { pending } = useFormStatus();

    return (
        <div className="flex flex-col gap-3">
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
            <div>
                {!isValid && (
                    <Button type="submit" disabled={true}>
                        Register
                    </Button>
                )}

                {isValid && !pending && <Button type="submit">Register</Button>}

                {pending && (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                )}
            </div>

            <div>{formState.message}</div>
        </div>
    );
}
