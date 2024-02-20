'use client';

import React, {
    MouseEvent,
    MouseEventHandler,
    useState,
    ChangeEventHandler,
    ChangeEvent,
} from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { SendHorizontal } from 'lucide-react';

export default function SearchBarChat({ socket }: any) {
    const [newMessage, setNewMessage] = useState<string>('');

    const handleOnSendMessage: MouseEventHandler<HTMLButtonElement> = (
        e: MouseEvent<HTMLButtonElement>,
    ) => {
        console.log(e);
        socket.emit('chat message', {
            message: newMessage,
            socketid: socket.id,
        });
        setNewMessage('');
    };

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        setNewMessage(e.target.value);
    };

    return (
        <form
            className="flex-none flex flex-row gap-1  "
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <Input
                value={newMessage}
                onChange={onInputChange}
                className="h-10 focus:ring-none"
            ></Input>
            <Button type="submit" onClick={handleOnSendMessage}>
                <SendHorizontal></SendHorizontal>
            </Button>
        </form>
    );
}
