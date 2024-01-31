import Image from 'next/image';

import { Button } from '@/components/ui/button';

import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <Button asChild>
                <Link href="/">Login</Link>
            </Button>
        </div>
    );
}
