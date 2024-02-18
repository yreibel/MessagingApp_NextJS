'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

import React, {
    FormEvent,
    useEffect,
    ChangeEvent,
    useRef,
    ChangeEventHandler,
} from 'react';

import { useState } from 'react';

import { useForm, FieldErrors, UseFormRegister } from 'react-hook-form';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2, CheckCircle, XCircle } from 'lucide-react';

//export type SubmitEvent = FormEvent<HTMLFormElement>;

import { FormStateRegister } from '@/utils/_server_actions';
import { registerUser } from '@/utils/_server_actions';

import { registrationFormSchema as schema } from '@/utils/_validation';

import { signIn } from 'next-auth/react';

import { verifEmail } from '@/utils/_server_actions';

type FormValues = z.infer<typeof schema>;

/*function usePrevious(value: any) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

function useEffectAllDepsChange(fn: () => void, deps: any[]) {
    const prevDeps = usePrevious(deps);
    const changeTarget = useRef<any>();

    useEffect(() => {
        // nothing to compare to yet
        if (changeTarget.current === undefined) {
            changeTarget.current = prevDeps;
        }

        // we're mounting, so call the callback
        if (changeTarget.current === undefined) {
            return fn();
        }

        // make sure every dependency has changed
        if (changeTarget.current.every((dep: any, i: any) => dep !== deps[i])) {
            changeTarget.current = deps;

            return fn();
        }
    }, [fn, prevDeps, deps]);
}*/

export function RegistrationForm() {
    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
        setFocus,
        reset,
        getValues,
    } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'all' });

    const [formState, formAction] = useFormState(registerUser, {
        success: false,
        user: { nickname: '', email: '', password: '' },
    });

    const [email, setEmail] = useState<string>('');

    const [emailExisting, setEmailExisting] = useState<boolean>(true);

    /**
     * onChange handler
     * @param e
     */
    const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('bonjour', e.target.value);
        setEmail(e.target.value);
    };

    /**
     * Execute signIn after registration of the user
     */
    useEffect(() => {
        // Async function to execute sign in function
        const executeSignIn = async () => {
            const credentials = {
                email: formState.user?.email,
                password: formState.user?.password,
                redirect: true,
                callbackUrl: '/',
            };

            console.log(credentials);

            const res = await signIn('credentials', credentials);

            if (res?.error) {
                console.log(res.error);
            }

            console.log(res);
        };

        if (formState.success) {
            executeSignIn();

            // Reset form to default values
            reset();
        }
    }, [formState.success, formState.user]);

    /**
     * Check if email is unique (already exists in db)
     */
    useEffect(() => {
        const checkEmailField = async () => {
            const emailExists = await verifEmail(email);
            console.log('email:', emailExists);
            //setEmailExisting(emailExists);
            setEmailExisting(emailExists);
            //return emailExists;
        };

        if (isValid) {
            checkEmailField();
        }
    }, [email]);

    return (
        <form action={formAction}>
            <RegistrationFormContent
                register={register}
                isValid={isValid}
                errors={errors}
                formState={formState}
                handleOnChangeEmail={handleOnChangeEmail}
                emailExisting={emailExisting}
            ></RegistrationFormContent>
        </form>
    );
}

export function RegistrationFormContent({
    register,
    isValid,
    errors,
    formState,
    handleOnChangeEmail,
    emailExisting,
}: {
    register: UseFormRegister<FormValues>;
    isValid: boolean;
    errors: FieldErrors<FormValues>;
    formState: FormStateRegister;
    handleOnChangeEmail: ChangeEventHandler<HTMLInputElement>;
    emailExisting: boolean;
}) {
    const { pending } = useFormStatus();

    return (
        <div className="grid gap-3 md:grid-cols-2 grid-flow-row">
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

            <div className="flex flex-col gap-1 row-start-2 col-start-1">
                <div className="text-sm">Email</div>

                <Input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    onChange={handleOnChangeEmail}
                />

                {errors.email && (
                    <div className="text-xs">{errors.email.message}</div>
                )}
            </div>

            <div className="row-start-2 col-start-2 mt-8">
                {emailExisting ? (
                    <XCircle color="#eb4414" />
                ) : (
                    <CheckCircle color="#54a800" />
                )}
            </div>

            <div className="flex flex-col gap-1 row-start-3">
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

            <div className="flex flex-col gap-1 row-start-4">
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
            <div className="row-start-5">
                {!isValid ||
                    (emailExisting && (
                        <Button type="submit" disabled={true}>
                            Register
                        </Button>
                    ))}

                {isValid && !pending && !emailExisting && (
                    <Button type="submit">Register</Button>
                )}

                {pending && (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                )}
            </div>

            <div>{formState.user?.email}</div>
            <div>{formState.user?.nickname}</div>
        </div>
    );
}
