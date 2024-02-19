'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { SendHorizontal } from 'lucide-react';

import { LoginForm } from '@/components/LoginForm';

import Link from 'next/link';
import ChatMessage from './ChatMessage';

export default function Chat() {
    return (
        <div className="flex-grow overflow-y-auto p-5 h-[0px] scrollbar-thin flex flex-col gap-5">
            <ChatMessage isUser={true}></ChatMessage>
            <ChatMessage isUser={false}></ChatMessage>
        </div>
    );
}
