'use client';

import React, {
    MouseEvent,
    MouseEventHandler,
    useState,
    useEffect,
    ChangeEventHandler,
    ChangeEvent,
} from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { SendHorizontal } from 'lucide-react';

import { LoginForm } from '@/components/LoginForm';

import Link from 'next/link';
import ChatMessage from './ChatMessage';

import SearchBarChat from '@/components/SearchBarChat';

import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');

export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        // Listen for incoming messages
        const messageListener = (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on('chat message', messageListener);

        return () => {
            socket.off('chat message', messageListener);
        };
    }, [socket]);

    return (
        <>
            <div className="flex-grow overflow-y-auto p-5 h-[0px] scrollbar-thin flex flex-col gap-5">
                {messages.map((item, index) => (
                    <ChatMessage
                        key={index}
                        isUser={true}
                        message={item}
                    ></ChatMessage>
                ))}
            </div>

            <SearchBarChat socket={socket}></SearchBarChat>
        </>
    );
}
