import { connectMongo } from '@/utils/connectMongo';

import User from '@/models/UserModel';

export async function POST(req: Request) {
    const user_json = await req.json();

    let client;
    try {
        client = await connectMongo();

        console.log('DB connected');
    } catch (error) {
        console.log('error : ', error);
    }

    const newUser = {
        nickname: user_json.nickname,
        phone_number: user_json.phone_number,
        email: user_json.email,
        password: user_json.password,
        messages: [],
    };

    const user = new User(newUser);
    console.log(user);

    await user.save();

    return new Response(JSON.stringify(newUser), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 201,
    });
}

/**
 * 
 * 
 * {
   "first_name" :"greg",
   "last_name" : "bache",
   "phone_number" : "+33555555555",
   "email" : "greg.bache@gmail.com"
    }
 */
