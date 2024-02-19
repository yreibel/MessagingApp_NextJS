'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { SendHorizontal } from 'lucide-react';

import { LoginForm } from '@/components/LoginForm';

import Link from 'next/link';

type ChatParams = {
    isUser: boolean;
    message: string;
};

export default function ChatMessage({ isUser, message }: ChatParams) {
    return (
        <>
            {isUser ? (
                <div className="w-fit p-5 bg-slate-100 rounded-md self-end">
                    {message}
                </div>
            ) : (
                <div className="w-fit p-5 bg-slate-100 rounded-md self-start">
                    {message}
                </div>
            )}
        </>
    );
}
