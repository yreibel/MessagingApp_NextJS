import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { LoginForm } from '@/components/LoginForm';

import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="flex flex-col md:w-1/3 w-full items-center m-auto bg-slate-200 gap-8 py-2 border rounded-md">
            <div className="flex flex-col gap-4 w-1/2">
                <LoginForm />
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:justify-between text-xs w-full px-6 my-auto">
                <div className="my-auto">
                    If you aren't yet a member, please register here
                </div>
                <Button asChild className="w-[60px]">
                    <Link href="/auth/register">Register</Link>
                </Button>
            </div>
        </div>
    );
}
