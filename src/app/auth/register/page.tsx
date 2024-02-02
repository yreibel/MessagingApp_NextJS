import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

import RegistrationForm from '@/components/RegistrationForm';

//import { SubmitEvent } from '@/components/RegistrationForm';

export default function RegisterPage() {
    return (
        <div className="flex flex-col md:w-1/3 w-full items-center m-auto bg-slate-200 gap-8 py-2 border rounded-md">
            <div className="flex flex-col gap-4 w-1/2">
                <RegistrationForm />
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:justify-between text-xs w-full px-6 my-auto">
                <div className="my-auto">
                    Already have an account? Travel to login page
                </div>
                <Button asChild className="w-[60px]">
                    <Link href="/auth/login">Login</Link>
                </Button>
            </div>
        </div>
    );
}
