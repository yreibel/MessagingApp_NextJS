'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

import React, { FormEvent } from 'react';

export type SubmitEvent = FormEvent<HTMLFormElement>;

import { returnMessage } from '@/utils/_server_actions';

/*interface RegistrationProps {
    onSubmit: (e: SubmitEvent) => void;
}*/

export default function RegistrationForm() {
    const handleSubmit = async (e: SubmitEvent) => {
        const t = await returnMessage();

        console.log(t);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input type="nickname" placeholder="Nickname" />
            <Input type="email" placeholder="Email" />
            <Input type="number" placeholder="Phone number" />
            <Input type="password" placeholder="Password" />

            <Button type="submit">Register</Button>
        </form>
    );
}
