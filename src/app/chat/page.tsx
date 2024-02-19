import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { SendHorizontal } from 'lucide-react';

import { LoginForm } from '@/components/LoginForm';
import Chat from '@/components/Chat';
import SearchBarChat from '@/components/SearchBarChat';

export default function ChatPage() {
    return (
        <div className="flex items-center justify-center w-full bg-slate-500 overflow-y-hidden">
            <div className="flex flex-col w-[98%]  h-[98%] bg-slate-600">
                <Chat></Chat>
            </div>
        </div>
    );
}
