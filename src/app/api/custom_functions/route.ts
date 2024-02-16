import { IUserD } from '@/models/UserModel';
import { connectMongo } from '@/utils/connectMongo';

import { getUserByEmail } from '@/utils/db_functions';

export async function POST(req: Request) {
    const message_json = await req.json();

    let client;
    try {
        client = await connectMongo();
        console.log('DB connected');
    } catch (error) {
        console.log('error : ', error);
    }

    const email = 'yo.bache@gmail.com';
    const user: IUserD | null = await getUserByEmail(email);

    if (user !== null) console.log(user);
}
